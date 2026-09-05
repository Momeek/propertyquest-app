"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { PlusCircle, Heart, Building, Home, User } from "lucide-react";
import Link from "next/link";
import DashboardWelcome from "@/components/dashboard/dashboard-welcome";
import ListingsChart from "@/components/dashboard/listings-chart";
import { useCookieAuth } from "@/hooks/useCookieAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserRole } from "@/hooks/useCookieAuth";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useCurrentUserStore } from "@/store/auth.store";
import { PropertyAttr } from "@/interfaces/property.interface";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { useClient } from "@/hooks/useClient";

export default function ClientDashboard() {
  const router = useRouter();
  const { cookieToken, isLoading: isAuthLoading } = useCookieAuth();
  const { userRole, isLoading } = useUserRole();
  const { user } = useCurrentUserStore();
  const client = useClient();

  const { profileData } = useGetProfile({
    userId: user?.userId as string,
  });

  const { data } = useQuery<
    {
      properties: PropertyAttr[];
      likedPropertyCount: number;
      likedCountByMonth: Record<string, number>;
      meta: unknown;
    },
    AxiosError
  >({
    queryKey: ["property", user.userId],
    queryFn: async () =>
      client.get(`/property/${user.userId}`).then((res) => res.data.data),
    enabled: !!user.userId,
    initialData: {
      properties: [],
      likedPropertyCount: 0,
      likedCountByMonth: {} as Record<string, number>,
      meta: null,
    },
  });

  const activeListingsCount = data?.properties?.filter(
    (property) => property.active === true
  )?.length;

  const notActiveListingsCount = data?.properties?.filter(
    (property) => property.active === false
  )?.length;

  useEffect(() => {
    if (!isAuthLoading && !cookieToken) {
      router.push("/");
    }
  }, [cookieToken, isAuthLoading, router]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            Welcome back to your PropertyQuest dashboard
          </p>
        </div>
      </div>

      <DashboardWelcome />

      {isLoading || userRole === "user" ? null : (
        <>
          {profileData.UserDocument?.inReview ? (
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
              <p className="font-bold text-2xl text-yellow-600">
                Account Under Review
              </p>
              <p className="text-gray-600">
                Your account is currently under review. You will be notified
                once it is approved.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">
                          Published Listings
                        </p>
                        <p className="text-2xl font-bold">
                          {activeListingsCount || 0}
                        </p>
                      </div>
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Home className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Likes</p>
                        <p className="text-2xl font-bold">
                          {data.likedPropertyCount}
                        </p>
                      </div>
                      <div className="p-2 bg-red-100 rounded-full">
                        <Heart className="h-5 w-5 text-red-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">
                          Not-Published Listings
                        </p>
                        <p className="text-2xl font-bold">
                          {notActiveListingsCount || 0}
                        </p>
                      </div>
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Home className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Listings Engagement</CardTitle>
                    <CardDescription>
                      View statistics for your property listings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="all">
                      <div className="h-[300px]">
                        <ListingsChart likeSat={data.likedCountByMonth} />
                      </div>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {/* <Card>
                  <CardHeader>
                    <CardTitle>Subscription Status</CardTitle>
                    <CardDescription>
                      Your current plan and usage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Premium Plan</p>
                          <p className="text-sm text-gray-500">
                            Renews on Oct 15, 2023
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/client/subscription">Manage</Link>
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Listings Used</span>
                          <span className="font-medium">12 / 25</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="bg-primary h-full rounded-full"
                            style={{ width: "48%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Featured Listings</span>
                          <span className="font-medium">2 / 5</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="bg-primary h-full rounded-full"
                            style={{ width: "40%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card> */}

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                      Common tasks you might want to perform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="h-auto py-4 flex flex-col items-center justify-center"
                        asChild
                      >
                        <Link href="/dashboard/add-property">
                          <PlusCircle className="h-6 w-6 mb-2" />
                          <span>List your property with us</span>
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-auto py-4 flex flex-col items-center justify-center"
                        asChild
                      >
                        <Link href="/dashboard/projects">
                          <Building className="h-6 w-6 mb-2" />
                          <span>New Project</span>
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-auto py-4 flex flex-col items-center justify-center"
                        asChild
                      >
                        <Link href="/dashboard/profile">
                          <User className="h-6 w-6 mb-2" />
                          <span>Profile</span>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
