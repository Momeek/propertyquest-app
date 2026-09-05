"use client";
import Link from "next/link";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Calendar,
  Video,
} from "lucide-react";
import { PropertyAttr } from "@/interfaces/property.interface";
import {
  formatAmount,
  getAvatarUrl,
  getPropertyImagesUrl,
} from "@/utils/utils";
import { nodeEnv, vercelEnv } from "@/utils/baseUrl";
import { UserAttr } from "@/interfaces/user.interface";
import LazyImage from "@/components/ui/lazyImage";
import { JSONSafeParse } from "@/utils/utils";
import { useRouter, usePathname } from "next/navigation";
import { useCurrentUserStore } from "@/store/auth.store";

interface Property {
  property?: PropertyAttr;
  user?: UserAttr;
  company?: string;
  refetchProperties?: () => void;
}

export default function PropertyList({ property, user, company }: Property) {
  const router = useRouter();
  const pathname = usePathname();
  const { user: currentUser } = useCurrentUserStore();

  // Memoize parsed data
  const parsedData = useMemo(() => {
    return {
      details: JSONSafeParse(property?.details) as PropertyAttr["details"],
      media: JSONSafeParse(property?.media) as PropertyAttr["media"],
      location: JSONSafeParse(property?.location) as PropertyAttr["location"],
      pricing: JSONSafeParse(property?.pricing) as PropertyAttr["pricing"],
    };
  }, [
    property?.details,
    property?.media,
    property?.location,
    property?.pricing,
  ]);

  // Memoize derived values
  const memoizedValues = useMemo(() => {
    const isFeaturedImage = parsedData.media?.images?.find(
      (img) => img.isFeatured === true
    );
    const isPathnameRent = pathname.includes("rent");
    const isLiked = !!property?.LikedProperties?.some(
      (lp) => lp.userId === currentUser?.userId && lp.liked === true
    );

    return {
      isFeaturedImage,
      isPathnameRent,
      isLiked,
    };
  }, [
    parsedData.media?.images,
    pathname,
    property?.LikedProperties,
    currentUser?.userId,
  ]);

  const handleContactAgent = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/rent/${property?.propertyId}`);
  };

  const { details, media, location, pricing } = parsedData;
  const { isFeaturedImage, isPathnameRent, isLiked } = memoizedValues;

  return (
    <div className="space-y-6">
      <div className="space-y-6 mb-4">
        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
          <Link
            href={`${isPathnameRent ? "/rent/" : "/buy/"}${
              property?.propertyId
            }`}
            className="grid md:grid-cols-3 gap-4 p-4"
          >
            {/* Image Section */}
            <div className="relative">
              <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                <LazyImage
                  src={
                    vercelEnv === "production" || nodeEnv === "production"
                      ? (isFeaturedImage?.url as string)
                      : getPropertyImagesUrl(isFeaturedImage?.url as string) ??
                        "/placeholder.svg"
                  }
                  alt="property-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="absolute top-2 left-2 flex gap-2">
                {pricing?.isFeatured && (
                  <Badge variant="secondary" className="bg-gray-100">
                    Featured
                  </Badge>
                )}
                {media?.videoTourUrl && (
                  <Badge variant="secondary" className="bg-gray-100">
                    <Video className="h-3 w-3 mr-1" />
                    Video Tour
                  </Badge>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="md:col-span-2 space-y-4">
              <div className="md:flex justify-between items-start">
                <div className="text-right md:hidden sm:block">
                  <div className="text-2xl font-bold text-[#16a249]">
                    {formatAmount(
                      (pricing?.price || pricing?.rentPrice) as number
                    )}
                    {isPathnameRent && (
                      <span className="text-sm font-normal">/yr</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{details?.title}</h3>
                  <div className="flex items-center text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {location?.city}, {location?.neighborhood}
                  </div>
                </div>
                <div className="text-right hidden md:block">
                  <div className="text-2xl font-bold text-[#16a249]">
                    {formatAmount(
                      (pricing?.price || pricing?.rentPrice) as number
                    )}
                    {isPathnameRent && (
                      <span className="text-sm font-normal">/yr</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-500">
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  {details?.bedrooms === "0"
                    ? "Studio"
                    : details?.bedrooms + " " + "beds"}
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  {details?.bathrooms} baths
                </div>
                <div className="flex items-center">
                  <Maximize className="h-4 w-4 mr-1" />
                  {details?.area_sq_ft} sq ft
                </div>
                {isPathnameRent && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {pricing?.leaseTerm}
                  </div>
                )}
              </div>

              <div className="md:flex items-center justify-between pt-4 border-t border-[#b6b3b3]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden">
                    <LazyImage
                      src={
                        vercelEnv === "production" || nodeEnv === "production"
                          ? (user?.avatarUrl as string)
                          : getAvatarUrl(user?.avatarUrl as string) ??
                            "/user.jpg"
                      }
                      alt="user-image"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      {`${user?.name} ${user?.surname}`}
                    </div>
                    <div className="text-xs text-gray-500">{company}</div>
                    <div className="text-xs text-gray-500">
                      Listed on{" "}
                      {property?.createdAt
                        ? new Date(property.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <Heart
                    className={`h-6 w-6 mr-2 cursor-pointer`}
                    color={`${isLiked ? "#16a249" : "#000000"}`}
                    fill={`${isLiked ? "#16a249" : "#ffffff"}`}
                  />
                  <Button size="sm" onClick={(e) => handleContactAgent(e)}>
                    Contact Agent
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </Card>
      </div>
    </div>
  );
}