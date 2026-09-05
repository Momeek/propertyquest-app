"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyDetailsForm from "@/components/dashboard/property-details-form";
import PropertyMediaForm from "@/components/dashboard/property-media-form";
import PropertyLocationForm from "@/components/dashboard/property-location-form";
import PropertyPricingForm from "@/components/dashboard/property-pricing-form";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCookieAuth, useUserRole } from "@/hooks/useCookieAuth";
import Loader from "@/components/dashboard/loader";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useCurrentUserStore } from "@/store/auth.store";
import { useState } from "react";
import {
  PropertyAttr,
  PropertyFormSection,
} from "@/interfaces/property.interface";
import { useToast } from "@/components/ui/toast";
import { useClient } from "@/hooks/useClient";
import {
  getErrorMessage,
  isValidationError,
  getValidationErrors,
  JSONSafeParse,
} from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const DRAFT_STORAGE_KEY = "property_draft";

export default function AddPropertyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const { user } = useCurrentUserStore();
  const { cookieToken, isLoading: isAuthLoading } = useCookieAuth();
  const { userRole, isLoading: isRoleLoading } = useUserRole();
  const { profileData } = useGetProfile({
    userId: user?.userId as string,
  });
  const { addToast } = useToast();
  const client = useClient();

  // Fetch property data if editing
  const { data: property, isLoading: isPropertyLoading } = useQuery<
    PropertyAttr,
    AxiosError
  >({
    queryKey: ["propertyListingId", propertyId],
    queryFn: async () =>
      client
        .get(`/property/${propertyId}`, false)
        .then((res) => res.data.data?.property),
    enabled: !!propertyId,
    initialData: {} as PropertyAttr,
  });

  const [activeTab, setActiveTab] = useState<PropertyFormSection>(
    () => (searchParams.get("tab") as PropertyFormSection) || "details"
  );

  const [postData, setPostData] = useState<Partial<PropertyAttr>>(() => {
    if (propertyId && property && Object.keys(property).length > 0) {
      // Parse stringified JSON from API response
      const details = JSONSafeParse(
        property.details
      ) as PropertyAttr["details"];
      const media = JSONSafeParse(property.media) as PropertyAttr["media"];
      const location = JSONSafeParse(
        property.location
      ) as PropertyAttr["location"];
      const pricing = JSONSafeParse(
        property.pricing
      ) as PropertyAttr["pricing"];

      return {
        details: details || {},
        media: media || {},
        location: location || {},
        pricing: pricing || {},
      };
    }

    // Creating new property
    if (typeof window !== "undefined") {
      const draft = localStorage.getItem(DRAFT_STORAGE_KEY);
      return draft
        ? JSON.parse(draft)
        : {
            details: {},
            media: {},
            location: {},
            pricing: {},
          };
    }
    return {
      details: {},
      media: {},
      location: {},
      pricing: {},
    };
  });

  // Sync with fetched property data
  useEffect(() => {
    if (propertyId && property && Object.keys(property).length > 0) {
      const details = JSONSafeParse(
        property.details
      ) as PropertyAttr["details"];
      const media = JSONSafeParse(property.media) as PropertyAttr["media"];
      const location = JSONSafeParse(
        property.location
      ) as PropertyAttr["location"];
      const pricing = JSONSafeParse(
        property.pricing
      ) as PropertyAttr["pricing"];

      setPostData({
        details: details || {},
        media: media || {},
        location: location || {},
        pricing: pricing || {},
      });
    }
  }, [property, propertyId]);

  const updateFormData = <T extends PropertyFormSection>(
    section: T,
    data: Partial<PropertyAttr[T]>
  ) => {
    const currentSectionData = postData[section] || {};
    const newSectionData = {
      ...(currentSectionData as object),
      ...(data as object),
    };

    const newData = {
      ...postData,
      [section]: newSectionData,
    };

    setPostData(newData);
    return newData;
  };

  const saveDraft = (section?: PropertyFormSection) => {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(postData));
      addToast({
        title: section
          ? `Draft saved for ${section} section`
          : "Draft saved successfully",
        description: "",
        type: "success",
        position: "bottom-center",
      });
      return true;
    } catch (error: unknown) {
      console.error(error);
      addToast({
        title: "Failed to save draft",
        description: "",
        type: "error",
        position: "bottom-center",
      });
      return false;
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setPostData({
      details: {},
      media: {},
      location: {},
      pricing: {},
    });
  };

  const handleTabChange = (tab: PropertyFormSection) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleNext = (nextTab: PropertyFormSection) => {
    handleTabChange(nextTab);
  };

  const handlePrevious = (prevTab: PropertyFormSection) => {
    handleTabChange(prevTab);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("details", JSON.stringify(postData.details));
      formData.append("location", JSON.stringify(postData.location));
      formData.append("pricing", JSON.stringify(postData.pricing));
      formData.append("media", JSON.stringify(postData.media));

      if (postData.media?.images) {
        postData.media.images.forEach((image) => {
          if (image.file) {
            formData.append(`images`, image.file);
          }
        });
      }

      if (postData.media?.floorPlan?.file) {
        formData.append("floorPhoto", postData.media.floorPlan.file);
      }

      // Use update endpoint if editing, otherwise create
      const endpoint = propertyId
        ? `/property/update-property/${propertyId}`
        : `/property/add-property/${user?.userId as string}`;

      const method = propertyId ? client.multiPartPatch : client.multiPartPost;
      await method(endpoint, formData);

      addToast({
        title: propertyId
          ? "Property updated successfully"
          : "Property created successfully",
        description: propertyId
          ? "Your property has been updated."
          : "The created property is under review for approval, once approved, it will be publicly published.",
        type: "success",
        position: "top-center",
        duration: 10000,
      });
      clearDraft();
      router.push("/dashboard/listings");
    } catch (error: unknown) {
      console.error("Error creating/updating property:", error);
      const title = getErrorMessage(error);
      addToast({
        title: propertyId
          ? "Failed to update property"
          : "Failed to create property",
        description: isValidationError(title)
          ? getValidationErrors(error)
          : title,
        type: "error",
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    if (!isAuthLoading && !cookieToken) {
      router.push("/");
    }
  }, [cookieToken, isAuthLoading, router]);

  if (isAuthLoading || isRoleLoading || isPropertyLoading) {
    return <Loader msg="" />;
  }

  if (userRole === "user") {
    return (
      <div className="space-y-6 p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-red-600">
          Access Denied
        </h1>
        <p className="text-gray-600">
          Your account does not have permission to add properties. Please
          contact an administrator if you believe this is an error.
        </p>
      </div>
    );
  }

  if (profileData.UserDocument?.inReview) {
    return (
      <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
        <p className="font-bold text-2xl text-yellow-600">
          Account Under Review
        </p>
        <p className="text-gray-600">
          Your account is currently under review. You will be notified once it
          is approved.
        </p>
      </div>
    );
  }

  if (
    !propertyId &&
    (!profileData.location ||
      !profileData.professionalInfo ||
      !profileData.socialMedia)
  ) {
    return (
      <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
        <p className="font-bold text-2xl text-yellow-600">
          Update your profile informations
        </p>
        <p className="text-gray-600">
          Your details are needed to be able to post. Go to the profile page to
          update rest of your details.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          {propertyId ? "Edit Property" : "Add Property"}
        </h1>
        <p className="text-gray-500">
          {propertyId
            ? "Update your property listing"
            : "List a new property for sale or rent"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Information</CardTitle>
          <CardDescription>
            {propertyId
              ? "Update the details below to modify your property listing"
              : "Fill out the details below to create your property listing"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              handleTabChange(value as PropertyFormSection)
            }
            className="w-full"
          >
            <TabsList className="mb-6 grid grid-cols-4 w-full p-1">
              <TabsTrigger
                className="mt-[-3px]"
                value="details"
                disabled={!propertyId && activeTab !== "details"}
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                className="mt-[-3px]"
                value="media"
                disabled={!propertyId && activeTab !== "media"}
              >
                Media
              </TabsTrigger>
              <TabsTrigger
                className="mt-[-3px]"
                value="location"
                disabled={!propertyId && activeTab !== "location"}
              >
                Location
              </TabsTrigger>
              <TabsTrigger
                className="mt-[-3px]"
                value="pricing"
                disabled={!propertyId && activeTab !== "pricing"}
              >
                Pricing
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <PropertyDetailsForm
                data={postData.details}
                updateData={(data) => updateFormData("details", data)}
                onNext={() => handleNext("media")}
                saveDraft={() => saveDraft("details")}
              />
            </TabsContent>
            <TabsContent value="media">
              <PropertyMediaForm
                data={postData.media}
                updateData={(data) => updateFormData("media", data)}
                onNext={() => handleNext("location")}
                onPrevious={() => handlePrevious("details")}
                saveDraft={() => saveDraft("media")}
                isEditing={!!propertyId}
              />
            </TabsContent>
            <TabsContent value="location">
              <PropertyLocationForm
                data={postData.location}
                updateData={(data) => updateFormData("location", data)}
                onNext={() => handleNext("pricing")}
                onPrevious={() => handlePrevious("media")}
                saveDraft={() => saveDraft("location")}
              />
            </TabsContent>
            <TabsContent value="pricing">
              <PropertyPricingForm
                data={postData.pricing}
                updateData={(data) => updateFormData("pricing", data)}
                onPrevious={() => handlePrevious("location")}
                onSubmit={handleSubmit}
                saveDraft={() => saveDraft("pricing")}
                isEditing={!!propertyId}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}