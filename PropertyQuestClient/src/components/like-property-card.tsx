import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Maximize } from "lucide-react";
import {
  PropertyAttr,
  PropertyLikesAttr,
} from "@/interfaces/property.interface";
import { formatAmount, getPropertyImagesUrl } from "@/utils/utils";
import { nodeEnv, vercelEnv } from "@/utils/baseUrl";
import LazyImage from "@/components/ui/lazyImage";
import {
  getErrorMessage,
  isValidationError,
  getValidationErrors,
} from "@/utils/utils";
import { useToast } from "@/components/ui/toast";
import { useClient } from "@/hooks/useClient";
import { Button } from "@/components/ui/button";
import { Trash2, Bed, Bath, ExternalLink } from "lucide-react";
import { ConfirmDialog } from "./ui/confirmation-dialog";

interface PropertyCardProps {
  propertyId?: string;
  details?: PropertyAttr["details"];
  location?: PropertyAttr["location"];
  media?: PropertyAttr["media"];
  pricing?: PropertyAttr["pricing"];
  listingType?: "sale" | "rent";
  LikedProperties?: PropertyLikesAttr;
  createdAt?: Date | undefined | string | number;
  refetch?: () => void;
  length?: number;
}

export default function LikePropertyCard({
  propertyId,
  details,
  media,
  location,
  pricing,
  LikedProperties,
  createdAt,
  refetch,
  length,
}: PropertyCardProps) {
  const client = useClient();
  const { addToast } = useToast();
  const isFeaturedImage = media?.images?.find((img) => img.isFeatured === true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDeleteLike = async () => {
    if (!LikedProperties?.likeId) {
      addToast({
        title: "Error",
        description: "No liked property to delete",
        type: "error",
        position: "top-center",
      });
      return;
    }
    try {
      await client.delete(
        `/property/liked-property/${LikedProperties?.likeId}`
      );
      addToast({
        title: "Success",
        description: "Property removed from favorites",
        type: "success",
        position: "bottom-center",
      });
      if (length && length >= 2) {
        refetch?.();
      } else {
        window.location.reload();
      }
    } catch (error: unknown) {
      console.error("Failed to send message.:", error);
      const title = getErrorMessage(error);
      addToast({
        title: "Failed to delete favourite.",
        description: isValidationError(title)
          ? getValidationErrors(error)
          : `code: ${title}`,
        type: "error",
        position: "top-center",
      });
    }
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-48">
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
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 hover:bg-white text-red-500"
              onClick={() => setConfirmOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
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
                <span className="line-clamp-1">{location?.address}</span>
              </div>
            </div>
            <Badge variant="outline">{details?.listingType}</Badge>
          </div>

          <div className="text-lg font-bold text-[#16a249] mt-2 mb-4">
            {formatAmount((pricing?.price || pricing?.rentPrice) as number)}
            {details?.listingType === "rent" && (
              <span className="text-sm font-normal">/yr</span>
            )}
          </div>

          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1 text-gray-500" />
              <span>
                {details?.bedrooms === "0" ? "Studio" : details?.bedrooms}{" "}
              </span>
              <span className="text-gray-500 mx-1">{`${
                details?.bedrooms !== "0" ? "Beds" : ""
              }`}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 text-gray-500" />
              <span className="font-medium">{details?.bathrooms}</span>
              <span className="text-gray-500 mx-1">Baths</span>
            </div>
            <div className="flex items-center">
              <Maximize className="h-4 w-4 mr-1 text-gray-500" />
              <span className="font-medium">{details?.area_sq_ft}</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#b6b3b3]">
            <span className="text-xs text-gray-500">
              Saved on{" "}
              {createdAt
                ? new Date(createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : ""}
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link
                href={`/${
                  details?.listingType === "sale" ? "buy" : "rent"
                }/${propertyId}`}
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1" />
                View
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Remove from favorites?"
        description="This will permanently remove the property from your favourites."
        confirmText="Remove"
        cancelText="Cancel"
        onConfirm={handleDeleteLike}
        icon={<Trash2 className="h-5 w-5 text-red-500" />}
      />
    </>
  );
}
