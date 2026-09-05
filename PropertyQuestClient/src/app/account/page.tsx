"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useUserRole } from "@/hooks/useCookieAuth";
import { useCurrentUserStore } from "@/store/auth.store";
import { useCookieAuth } from "@/hooks/useCookieAuth";
import Loader from "@/components/dashboard/loader";
import { useClient } from "@/hooks/useClient";
import { useToast } from "@/components/ui/toast";
import {
  getErrorMessage,
  isValidationError,
  getValidationErrors,
} from "@/utils/utils";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

export default function AccountPage() {
  const { isLoading } = useUserRole();
  const { user, setUser, isAthenticated } = useCurrentUserStore();
  const { cookieToken, isLoading: isCookieLoading } = useCookieAuth();
  const client = useClient();
  const navigate = useRouter();
  const { profileData } = useGetProfile({
    userId: user?.userId as string,
  });
  const { addToast } = useToast();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user || profileData) {
      setName(user?.name || profileData?.name || "");
      setSurname(user?.surname || profileData?.surname || "");
      setPhone(user?.phone || profileData?.phone || "");
    }
  }, [user, profileData]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      addToast({
        title: "Name cannot be empty",
        description: "",
        type: "error",
        position: "top-center",
      });
      return;
    }
    if (!surname.trim()) {
      addToast({
        title: "Surname cannot be empty",
        description: "",
        type: "error",
        position: "top-center",
      });
      return;
    }
    if (!phone.trim()) {
      addToast({
        title: "Phone cannot be empty",
        description: "",
        type: "error",
        position: "top-center",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await client.put("/profile/me", {
        name,
        surname,
        phone,
        userId: user.userId,
      });

      setUser(result.data.data.user);

      addToast({
        title: "Account info updated Successful",
        description: "Your account info has been updated",
        type: "success",
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Failed to update account info", error);
      const title = getErrorMessage(error);
      addToast({
        title: "Failed to update account info",
        description: isValidationError(title)
          ? getValidationErrors(error)
          : `code: ${title}`,
        type: "error",
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!cookieToken || !isAthenticated) {
      navigate.push("/");
      return;
    }
  }, [cookieToken, navigate, isAthenticated]);

  if (isLoading || isCookieLoading) {
    return <Loader msg="Account Info" />;
  }

  return (
    <>
      <Header />
      <div className="space-y-6 min-h-screen bg-gray-50 px-4 py-8 md:px-8 md:py-12">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">My Account</h1>
          <p className="text-gray-500">{`Account informations`}</p>
        </div>
        <form onSubmit={handleSave} className="w-full">
          <div className="space-y-4">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                className={`${
                  isSubmitting && "cursor-not-allowed"
                } text-2xl border bg-white border-[#ddd] rounded p-3 w-full`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-4 mt-5 text-2xl">
            <Label htmlFor="surname">Surname</Label>
            <div className="relative">
              <input
                id="surname"
                name="surname"
                type="text"
                className={`${
                  isSubmitting && "cursor-not-allowed"
                } text-2xl border bg-white border-[#ddd] rounded p-3 w-full`}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-4 mt-5 text-2xl">
            <Label htmlFor="phone">Phone</Label>
            <div className="relative">
              <input
                id="phone"
                name="phone"
                type="text"
                className={`${
                  isSubmitting && "cursor-not-allowed"
                } text-2xl border bg-white border-[#ddd] rounded p-3 w-full`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-4 mt-5 text-2xl">
            <Label htmlFor="surname">Email</Label>
            <div className="relative">
              <input
                id="email"
                type="text"
                className="text-2xl border bg-[#dadada] cursor-not-allowed text-[#838383] border-[#ddd] rounded p-3 w-full"
                value={user?.email}
                disabled
              />
            </div>
          </div>
          <div className="mt-5">
            <Button
              className="w-full md:w-fit"
              size="lg"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
