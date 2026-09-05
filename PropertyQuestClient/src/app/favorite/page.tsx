"use client";
import { useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import FavoriteProperties from "@/components/dashboard/favorite-properties";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useCookieAuth } from "@/hooks/useCookieAuth";
import { useRouter } from "next/navigation";

export default function FavouritePage() {
  const { cookieToken, isLoading: isCookieLoading } = useCookieAuth();
  const navigate = useRouter();

  useEffect(() => {
    if (!cookieToken && !isCookieLoading) {
      navigate.push("/");
      return;
    }
  }, [cookieToken, navigate, isCookieLoading]);

  return (
    <>
      <Header />
      <div className="space-y-6 min-h-screen bg-gray-50 px-4 py-8 md:px-8 md:py-12">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Favourite</h1>
          <p className="text-gray-500">{`Liked properties`}</p>
        </div>

        <Tabs defaultValue="properties" className="w-full">
          <TabsContent value="properties">
            <FavoriteProperties />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  );
}
