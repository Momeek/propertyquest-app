"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { notFound, useParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyGallery from "./property-gallery";
import PropertyFeatures from "./property-features";
import PropertyLocation from "./property-location";
import SimilarProperties from "./similar-properties";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Calendar,
  Phone,
  Mail,
} from "lucide-react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useQuery } from "@tanstack/react-query";
import { useClient } from "@/hooks/useClient";
import { PropertyAttr } from "@/interfaces/property.interface";
import { UserAttr } from "@/interfaces/user.interface";
import { AxiosError } from "axios";
import LazyImage from "@/components/ui/lazyImage";
import { JSONSafeParse } from "@/utils/utils";
import { formatAmount, getAvatarUrl } from "@/utils/utils";
import { nodeEnv, vercelEnv } from "@/utils/baseUrl";
import PropertySkeleton from "@/components/propertySkeletonDetail";
import {
  getErrorMessage,
  isValidationError,
  getValidationErrors,
} from "@/utils/utils";
import { useToast } from "@/components/ui/toast";
import { useCurrentUserStore } from "@/store/auth.store";

export default function PropertyDetailPage() {
  const { id: propertyId } = useParams();
  const pathname = usePathname();
  const client = useClient();
  const { addToast } = useToast();
  const { user } = useCurrentUserStore();

  const {
    data: property,
    isLoading,
    isFetching,
  } = useQuery<PropertyAttr, AxiosError>({
    queryKey: ["propertyId", propertyId],
    queryFn: async () =>
      client
        .get(`/property/${propertyId}`, false)
        .then((res) => res.data.data?.property),
    enabled: !!propertyId,
    initialData: {} as PropertyAttr,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Memoize parsed data
  const { professionalInfo, details, media, location, pricing } =
    useMemo(() => {
      return {
        professionalInfo: JSONSafeParse(
          property?.User?.professionalInfo
        ) as UserAttr["professionalInfo"],
        details: JSONSafeParse(property?.details) as PropertyAttr["details"],
        media: JSONSafeParse(property?.media) as PropertyAttr["media"],
        location: JSONSafeParse(property?.location) as PropertyAttr["location"],
        pricing: JSONSafeParse(property?.pricing) as PropertyAttr["pricing"],
      };
    }, [
      property?.User?.professionalInfo,
      property?.details,
      property?.media,
      property?.location,
      property?.pricing,
    ]);

  // Memoize agent ID and like ID
  const agentId = useMemo(
    () => property?.User?.userId,
    [property?.User?.userId]
  );

  const likedId = useMemo(() => {
    return Array.isArray(property?.LikedProperties)
      ? property.LikedProperties.find((like) => like.userId === user?.userId)
          ?.likeId
      : undefined;
  }, [property?.LikedProperties, user?.userId]);

  // Memoize pathname check
  const isPathnameRent = useMemo(() => pathname.includes("rent"), [pathname]);

  // Memoize user avatar URL
  const userAvatarUrl = useMemo(() => {
    if (vercelEnv === "production" || nodeEnv === "production") {
      return property?.User?.avatarUrl as string;
    }
    return getAvatarUrl(property?.User?.avatarUrl as string) ?? "/user.jpg";
  }, [property?.User?.avatarUrl]);

  // Memoize price display
  const priceDisplay = useMemo(() => {
    const amount = pricing?.price || pricing?.rentPrice;
    if (!amount) return null;
    return formatAmount(amount);
  }, [pricing?.price, pricing?.rentPrice]);

  // Initialize isLiked from property data when it loads
  useEffect(() => {
    if (
      Array.isArray(property?.LikedProperties) &&
      property.LikedProperties.length > 0
    ) {
      const userLike = property.LikedProperties.find(
        (like) => like.userId === user?.userId && like.liked === true
      );
      setIsLiked(!!userLike);
    } else {
      setIsLiked(false);
    }
  }, [property?.LikedProperties, user?.userId]);

  // Memoize form handlers
  const handleFormChange = useCallback(
    (field: keyof typeof formData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!user?.userId) {
        addToast({
          title: "Please sign in",
          description: "You must be signed in to message the agent.",
          type: "error",
          position: "top-center",
        });
        return;
      }

      setIsSubmitLoading(true);

      try {
        await client.post(`/property/message-agent/${agentId}`, {
          ...formData,
          userId: user?.userId,
          propertyId,
        });

        addToast({
          title: "Message sent!",
          description: "The agent will get back to you shortly.",
          type: "success",
          position: "bottom-center",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } catch (error: unknown) {
        console.error("Failed to send message.:", error);
        const title = getErrorMessage(error);
        addToast({
          title: "Failed to send message.",
          description: isValidationError(title)
            ? getValidationErrors(error)
            : `code: ${title}`,
          type: "error",
          position: "top-center",
        });
      } finally {
        setIsSubmitLoading(false);
      }
    },
    [formData, user?.userId, agentId, propertyId, client, addToast]
  );

  const handleLike = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!user?.userId) {
        addToast({
          title: "Please sign in",
          description: "You must be signed in to like a property.",
          type: "error",
          position: "top-center",
        });
        return;
      }

      const newLikedStatus = !isLiked;
      setIsLiked(newLikedStatus);

      try {
        await client.post(`/property/liked-property`, {
          userId: user?.userId,
          propertyId,
          liked: newLikedStatus,
          likedId,
        });
      } catch (error: unknown) {
        console.error("Failed to like property:", error);
        const title = getErrorMessage(error);
        setIsLiked(!newLikedStatus); // Revert on error
        addToast({
          title: "Failed to like property.",
          description: isValidationError(title)
            ? getValidationErrors(error)
            : `code: ${title}`,
          type: "error",
          position: "top-center",
        });
      }
    },
    [isLiked, user?.userId, propertyId, likedId, client, addToast]
  );

  // Memoize property detail items
  const propertyDetails = useMemo(
    () => [
      {
        icon: Bed,
        value: details?.bedrooms === "0" ? "Studio" : details?.bedrooms,
        label: `${details?.bedrooms !== "0" ? "Bedrooms" : ""}`,
      },
      {
        icon: Bath,
        value: details?.bathrooms,
        label: "Bathrooms",
      },
      {
        icon: Maximize,
        value: details?.area_sq_ft,
        label: "Sq Ft",
      },
      {
        icon: Calendar,
        value: details?.yearBuilt || "N/A",
        label: "Year Built",
      },
    ],
    [
      details?.bedrooms,
      details?.bathrooms,
      details?.area_sq_ft,
      details?.yearBuilt,
    ]
  );

  if (isLoading || isFetching) {
    return <PropertySkeleton />;
  }

  if (!property) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pb-12">
        {/* Back Button */}
        <div className="bg-white  px-6">
          <div className="container py-4">
            <Link
              href={`/buy`}
              className="inline-flex items-center text-gray-600 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to search results
            </Link>
          </div>
        </div>

        {/* Property Header */}
        <div className="bg-white border-b border-[#b6b3b3] px-6">
          <div className="container py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {details?.title}
                </h1>
                <div className="flex items-center text-gray-500 mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {location?.city}, {location?.neighborhood}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-3xl font-bold text-[#16a249]">
                  {priceDisplay}
                </div>
                <div className="flex gap-2 mt-2">
                  <Heart
                    className={`h-6 w-6 mr-2 cursor-pointer transition-colors`}
                    color={isLiked ? "#16a249" : "#000000"}
                    fill={isLiked ? "#16a249" : "#ffffff"}
                    onClick={handleLike}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-8 px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Property Details */}
            <div className="lg:col-span-2">
              {/* Property Gallery */}
              <PropertyGallery
                images={media?.images || []}
                hasVideo={!!media?.videoTourUrl}
              />

              {/* Property Details Tabs */}
              <div className="mt-8 bg-white rounded-lg border border-[#b6b3b3] overflow-hidden">
                <Tabs defaultValue="overview">
                  <TabsList className="w-full border-b rounded-none bg-white p-0">
                    <TabsTrigger
                      value="overview"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#16a249] data-[state=active]:shadow-none py-4"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="features"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#16a249] data-[state=active]:shadow-none py-4"
                    >
                      Features
                    </TabsTrigger>
                    <TabsTrigger
                      value="location"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#16a249] data-[state=active]:shadow-none py-4"
                    >
                      Location
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="p-6">
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-6">
                        {propertyDetails.map(
                          ({ icon: Icon, value, label }, index) => (
                            <div key={index} className="flex items-center">
                              <Icon className="h-5 w-5 mr-2 text-gray-500" />
                              <div>
                                <div className="font-medium">{value}</div>
                                <div className="text-sm text-gray-500">
                                  {label}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Description
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {details?.description}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="p-6">
                    <PropertyFeatures features={details?.features} />
                  </TabsContent>

                  <TabsContent value="location" className="p-6">
                    <PropertyLocation location={location} />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Similar Properties */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Similar Properties</h3>
                <SimilarProperties
                  currentPropertyId={property?.propertyId as string}
                  detail={details}
                  isPathnameRent={isPathnameRent}
                />
              </div>
            </div>

            {/* Right Column - Agent Info & Contact */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-[#b6b3b3] p-6 sticky top-20">
                <div className="flex items-center gap-4 pb-4 border-b border-[#b6b3b3]">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <LazyImage src={userAvatarUrl} alt="user-image" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {property?.User?.name + " " + property?.User?.surname}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {professionalInfo?.company || "PropertyQuest"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {professionalInfo?.yearOfExperience} years experience
                    </p>
                  </div>
                </div>

                <div className="py-4 space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{property?.User?.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{property?.User?.email}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#b6b3b3]">
                  <h4 className="font-medium mb-2">
                    Interested in this property?
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Fill out the form below and our agent will get back to you
                    as soon as possible.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleFormChange("name")}
                      placeholder="Your Name"
                      className="w-full px-3 py-2 border border-[#b6b3b3] rounded-md"
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange("email")}
                      required
                      placeholder="Your Email"
                      className="w-full px-3 py-2 border border-[#b6b3b3] rounded-md"
                    />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={handleFormChange("phone")}
                      placeholder="Your WhatsApp Phone"
                      required
                      className="w-full px-3 py-2 border border-[#b6b3b3] rounded-md"
                    />
                    <textarea
                      value={formData.message}
                      onChange={handleFormChange("message")}
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-3 py-2 border border-[#b6b3b3] rounded-md"
                      required
                    ></textarea>
                    <Button type="submit" className="w-full">
                      {isSubmitLoading ? "Sending message.." : "Message Agent"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}