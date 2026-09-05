import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Video, MapPin, Maximize } from "lucide-react";
import { PropertyAttr } from "@/interfaces/property.interface";
import { formatAmount, getPropertyImagesUrl } from "@/utils/utils";
import { nodeEnv, vercelEnv } from "@/utils/baseUrl";
import LazyImage from "@/components/ui/lazyImage";
import { useCurrentUserStore } from "@/store/auth.store";

interface PropertyCardProps {
  propertyId?: string;
  details?: PropertyAttr["details"];
  location?: PropertyAttr["location"];
  media?: PropertyAttr["media"];
  pricing?: PropertyAttr["pricing"];
  listingType?: "sale" | "rent";
  LikedProperties?: PropertyAttr["LikedProperties"];
}

export default function PropertyCard({
  propertyId,
  details,
  media,
  location,
  pricing,
  listingType,
  LikedProperties,
}: PropertyCardProps) {
  const { user } = useCurrentUserStore();
  const isFeaturedImage = media?.images?.find((img) => img.isFeatured === true);
  const isLiked =
    Array.isArray(LikedProperties) &&
    LikedProperties.some(
      (like) => like.userId === user?.userId && like.liked === true
    );
  return (
    <Link
      href={
        listingType === "sale" ? `/buy/${propertyId}` : `/rent/${propertyId}`
      }
    >
      <Card className="overflow-hidden property-card">
        <div className="relative">
          <div className="relative h-48 w-full">
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

          <div className="absolute top-3 left-3 flex gap-2">
            {pricing?.isFeatured && (
              <Badge variant="secondary" className="bg-gray-100">
                Featured
              </Badge>
            )}
          </div>

          <div className="absolute top-3 right-3 flex gap-2">
            {media?.videoTourUrl && (
              <div className="bg-black/70 p-1.5 rounded-full">
                <Video className="h-4 w-4 text-white" />
              </div>
            )}
            <button className="bg-white/90 p-1.5 rounded-full hover:bg-white">
              <Heart
                className={`h-4 w-4 ${
                  isLiked ? "text-[#16a249]" : "text-gray-600"
                }`}
                fill={`${isLiked ? "#16a249" : "#ffffff"}`}
              />
            </button>
          </div>

          <div className="absolute bottom-3 right-3 bg-black/70 px-2 py-1 rounded text-xs text-white font-medium">
            {details?.bedrooms === "0"
              ? "Studio"
              : details?.bedrooms + " " + "beds"}{" "}
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg line-clamp-1">
                {details?.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                {location?.city}, {location?.neighborhood}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-[#16a249]">
                {formatAmount((pricing?.price || pricing?.rentPrice) as number)}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#b6b3b3] text-sm">
            <div className="flex items-center">
              <span className="font-medium">
                {details?.bedrooms === "0" ? "Studio" : details?.bedrooms}{" "}
              </span>
              <span className="text-gray-500 mx-1">{`${
                details?.bedrooms !== "0" ? "Beds" : ""
              }`}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">{details?.bathrooms}</span>
              <span className="text-gray-500 mx-1">Baths</span>
            </div>
            <div className="flex items-center">
              <Maximize className="h-3.5 w-3.5 mr-1" />
              <span className="font-medium">{details?.area_sq_ft}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
