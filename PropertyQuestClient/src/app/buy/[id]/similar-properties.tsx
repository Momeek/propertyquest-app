"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Maximize, Video, Calendar } from "lucide-react";
import { PropertyAttr } from "@/interfaces/property.interface";
import {
  formatAmount,
  getPropertyImagesUrl,
  JSONSafeParse,
} from "@/utils/utils";
import { useFetchAllProperties } from "@/hooks/useFetchAllProperties";
import NoData from "@/components/no-data";
import LazyImage from "@/components/ui/lazyImage";
import { nodeEnv, vercelEnv } from "@/utils/baseUrl";

interface SimilarPropertiesProps {
  currentPropertyId: string;
  detail?: PropertyAttr["details"];
  isPathnameRent?: boolean;
}

export default function SimilarProperties({
  currentPropertyId,
  detail,
  isPathnameRent = false,
}: SimilarPropertiesProps) {
  const { data } = useFetchAllProperties();

  const filteredProperties = data
    ?.filter((property) => {
      const details = JSONSafeParse(
        property?.details
      ) as PropertyAttr["details"];
      return (
        details?.listingType === detail?.listingType &&
        property.propertyId !== currentPropertyId
      );
    })
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {filteredProperties && filteredProperties.length > 0 ? (
        filteredProperties.map((property) => {
          const details = JSONSafeParse(
            property?.details
          ) as PropertyAttr["details"];
          const media = JSONSafeParse(property?.media) as PropertyAttr["media"];
          const location = JSONSafeParse(
            property?.location
          ) as PropertyAttr["location"];
          const pricing = JSONSafeParse(
            property?.pricing
          ) as PropertyAttr["pricing"];

          const isFeaturedImage = media?.images?.find(
            (img) => img.isFeatured === true
          );
          return (
            <Link
              href={`${isPathnameRent ? "/rent/" : "/buy/"}${
                property.propertyId
              }`}
              key={property.propertyId}
            >
              <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                <div className="relative h-48">
                  <LazyImage
                    src={
                      vercelEnv === "production" || nodeEnv === "production"
                        ? (isFeaturedImage?.url as string)
                        : getPropertyImagesUrl(
                            isFeaturedImage?.url as string
                          ) ?? "/placeholder.svg"
                    }
                    alt="property-image"
                  />
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
                <CardContent className="p-4">
                  <h4 className="font-semibold line-clamp-1">
                    {details?.title}
                  </h4>
                  <p className="text-sm text-gray-500 mb-2">
                    {location?.address}
                  </p>
                  <p className="text-lg font-bold text-[#16a249] mb-2">
                    {formatAmount(
                      (pricing?.price || pricing?.rentPrice) as number
                    )}
                    {isPathnameRent && (
                      <span className="text-sm font-normal">/yr</span>
                    )}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Bed className="h-3.5 w-3.5 mr-1" />
                      {details?.bedrooms === "0"
                        ? "Studio"
                        : details?.bedrooms + " " + "beds"}{" "}
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-3.5 w-3.5 mr-1" />
                      {details?.bathrooms} baths
                    </div>
                    <div className="flex items-center">
                      <Maximize className="h-3.5 w-3.5 mr-1" />
                      {details?.area_sq_ft} sq ft
                    </div>
                    {isPathnameRent && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {pricing?.leaseTerm}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })
      ) : (
        <NoData />
      )}
    </div>
  );
}
