"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useClient } from "@/hooks/useClient";
import { useToast } from "@/components/ui/toast";
import {
  getErrorMessage,
  isValidationError,
  getValidationErrors,
} from "@/utils/utils";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useCurrentUserStore } from "@/store/auth.store";
import { UserAttr } from "@/interfaces/user.interface";
import { JSONSafeParse, formatDate } from "@/utils/utils";

export default function ProfileForm() {
  const { user, setUser } = useCurrentUserStore();
  const client = useClient();
  const { profileData } = useGetProfile({
    userId: user?.userId as string,
  });
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [restData, setRestData] = useState<UserAttr>({
    name: "",
    surname: "",
    email: "",
    phone: "",
    gender: "",
    dateOfbirth: "",
    professionalInfo: {
      areasOfExpert: {},
    },
    location: {},
    socialMedia: {},
  });

  // Initialize form data
  useEffect(() => {
    if (profileData) {
      setRestData((prev) => ({
        ...prev,
        ...profileData,
        name: profileData?.name || "",
        surname: profileData?.surname || "",
        email: profileData?.email || "",
        phone: profileData?.phone || "",
        gender: profileData?.gender || "",
        dateOfbirth: formatDate(profileData?.dateOfbirth),
        location: JSONSafeParse(profileData?.location),
        professionalInfo: JSONSafeParse(profileData?.professionalInfo),
        socialMedia: JSONSafeParse(profileData?.socialMedia),
      }));
    }
  }, [profileData]);

  // Handler for top-level fields
  const handleChange = (field: keyof UserAttr, value: string) => {
    setRestData((prev) => ({ ...prev, [field]: value }));
  };

  // Handler for nested fields
  const handleNestedChange = (path: string[], value: unknown) => {
    setRestData((prev) => {
      const newState = { ...prev };
      let current: Record<string, unknown> = newState;

      if (path.length > 0 && typeof current[path[0]] === "string") {
        current[path[0]] = JSONSafeParse(current[path[0]]);
      }

      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]] as Record<string, unknown>;
      }

      current[path[path.length - 1]] = value;
      return newState;
    });
  };

  // Handler for number inputs
  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    path: string[]
  ) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    handleNestedChange(path, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!(restData?.name ?? "").trim()) {
      addToast({
        title: "Name cannot be empty",
        description: "",
        type: "error",
        position: "top-center",
      });
      return;
    }
    if (!(restData?.surname ?? "").trim()) {
      addToast({
        title: "Surname cannot be empty",
        description: "",
        type: "error",
        position: "top-center",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await client.put("/profile/me", {
        ...restData,
        userId: user.userId,
      });

      setUser(result.data.data.user);
      addToast({
        title: "Account info updated successfully",
        description: "Your account info has been updated",
        type: "success",
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Failed to update profile info", error);
      const title = getErrorMessage(error);
      addToast({
        title: "Failed to update profile info",
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal information and contact details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <Input
                  id="name"
                  value={restData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="surname">Surname</Label>
              <div className="relative">
                <Input
                  id="surname"
                  value={restData.surname}
                  onChange={(e) => handleChange("surname", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={restData.email}
                  disabled
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Input id="phone" type="tel" value={restData.phone} disabled />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <div className="relative">
                <input
                  id="dateOfBirth"
                  type="date"
                  className={`${
                    isSubmitting && "cursor-not-allowed"
                  } text-2xl border bg-white border-[#ddd] rounded p-2 w-full`}
                  value={restData.dateOfbirth}
                  onChange={(e) => handleChange("dateOfbirth", e.target.value)}
                  placeholder="yyyy-mm-dd"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                className={`${
                  isSubmitting && "cursor-not-allowed"
                } text-2xl border bg-white border-[#ddd] rounded p-2 w-full`}
                value={restData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
          <CardDescription>
            Update your professional details and expertise
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="role">Business Role</Label>
              <Input id="role" type="text" value={restData.role} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                value={restData.professionalInfo?.yearOfExperience ?? ""}
                onChange={(e) =>
                  handleNumberChange(e, [
                    "professionalInfo",
                    "yearOfExperience",
                  ])
                }
                min="0"
                max="50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="license">License Number</Label>
              <Input
                id="license"
                value={restData.professionalInfo?.licenseNumber ?? ""}
                onChange={(e) =>
                  handleNestedChange(
                    ["professionalInfo", "licenseNumber"],
                    e.target.value
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={restData.professionalInfo?.company ?? ""}
                onChange={(e) =>
                  handleNestedChange(
                    ["professionalInfo", "company"],
                    e.target.value
                  )
                }
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={restData.professionalInfo?.bio ?? ""}
                onChange={(e) =>
                  handleNestedChange(
                    ["professionalInfo", "bio"],
                    e.target.value
                  )
                }
                rows={4}
                className="border border-[#dddd]"
              />
              <p className="text-sm text-gray-500">
                Brief description for your profile. This will be visible to
                clients.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Areas of Expertise</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {[
                "residential",
                "commercial",
                "luxury",
                "investment",
                "rental",
                "international",
              ].map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={
                      restData.professionalInfo?.areasOfExpert?.[
                        area as keyof typeof restData.professionalInfo.areasOfExpert
                      ] || false
                    }
                    onCheckedChange={(checked) =>
                      handleNestedChange(
                        ["professionalInfo", "areasOfExpert", area],
                        checked
                      )
                    }
                  />
                  <label
                    htmlFor={area}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {area.charAt(0).toUpperCase() + area.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
          <CardDescription>
            Update your location and service areas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={restData.location?.address ?? ""}
                onChange={(e) =>
                  handleNestedChange(["location", "address"], e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={restData.location?.city ?? ""}
                onChange={(e) =>
                  handleNestedChange(["location", "city"], e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={restData.location?.state ?? ""}
                onChange={(e) =>
                  handleNestedChange(["location", "state"], e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                value={restData.location?.zipCode ?? ""}
                onChange={(e) =>
                  handleNestedChange(["location", "zipCode"], e.target.value)
                }
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="serviceAreas">Service Areas</Label>
              <Input
                id="serviceAreas"
                value={restData.location?.serviceAreas ?? ""}
                onChange={(e) =>
                  handleNestedChange(
                    ["location", "serviceAreas"],
                    e.target.value
                  )
                }
              />
              <p className="text-sm text-gray-500">
                Comma-separated list of areas you serve
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>Connect your social media accounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "website",
              "linkedIn",
              "twitter",
              "instagram",
              "facebook",
              "youtube",
              "tiktok",
            ].map((platform) => (
              <div key={platform} className="space-y-2">
                <Label htmlFor={platform}>
                  {platform === "linkedIn"
                    ? "LinkedIn"
                    : platform.charAt(0).toUpperCase() + platform.slice(1)}
                </Label>
                <Input
                  id={platform}
                  type="url"
                  placeholder={`https://${
                    platform === "website"
                      ? "yourwebsite.com"
                      : platform + (platform === "website" ? "" : "/username")
                  }`}
                  value={
                    restData.socialMedia?.[
                      platform as keyof typeof restData.socialMedia
                    ] ?? ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      ["socialMedia", platform],
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
