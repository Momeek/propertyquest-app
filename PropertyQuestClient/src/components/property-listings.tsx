"use client";
import { useState, useMemo } from "react";
import PropertyCard from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { PropertyAttr } from "@/interfaces/property.interface";
import { JSONSafeParse } from "@/utils/utils";
import NoData from "./no-data";
import PropertyCardSkeleton from "./property-card-skeleton-loader";
import { useFetchAllProperties } from "@/hooks/useFetchAllProperties";
import { useRouter } from "next/navigation";

// Pre-defined array for skeletons to avoid Array.from on every render
const SKELETON_ITEMS = [1, 2, 3];

export default function PropertyListings() {
  const navigate = useRouter();
  const [listingType, setListingType] = useState<"sale" | "rent">("sale");

  const { data, isFetching } = useFetchAllProperties(listingType);

  // Memoize the parsed properties to avoid re-parsing on every render
  const parsedProperties = useMemo(() => {
    if (!data) return [];

    return data.map((property) => {
      const details = JSONSafeParse(
        property?.details
      ) as PropertyAttr["details"];
      const media = JSONSafeParse(property.media) as PropertyAttr["media"];
      const location = JSONSafeParse(
        property.location
      ) as PropertyAttr["location"];
      const pricing = JSONSafeParse(
        property.pricing
      ) as PropertyAttr["pricing"];

      return {
        propertyId: property.propertyId,
        details,
        media,
        location,
        pricing,
        LikedProperties: property.LikedProperties,
      };
    });
  }, [data]);

  return (
    <section className="py-12 flex bg-[#ffffff] justify-center px-6">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {listingType === "sale"
                ? "Properties for Sale"
                : "Properties for Rent"}
            </h2>
            <p className="text-gray-500 mt-2">
              Discover our handpicked properties
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className={`font-medium hover:underline ${
                listingType === "sale" ? "text-[#16a249]" : "text-gray-500"
              }`}
              onClick={() => setListingType("sale")}
            >
              For Sale
            </button>
            <span className="text-gray-300">|</span>
            <button
              className={`font-medium hover:underline ${
                listingType === "rent" ? "text-[#16a249]" : "text-gray-500"
              }`}
              onClick={() => setListingType("rent")}
            >
              For Rent
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isFetching ? (
            SKELETON_ITEMS.map((item) => <PropertyCardSkeleton key={item} />)
          ) : parsedProperties.length > 0 ? (
            parsedProperties.map((property) => (
              <PropertyCard
                key={property.propertyId}
                propertyId={property.propertyId}
                details={property.details}
                location={property.location}
                media={property.media}
                pricing={property.pricing}
                listingType={listingType}
                LikedProperties={property.LikedProperties}
              />
            ))
          ) : (
            <NoData />
          )}
        </div>

        {!isFetching && parsedProperties.length > 0 && (
          <div className="mt-10 text-center">
            <Button
              onClick={() =>
                navigate.push(`/${listingType === "sale" ? "buy" : "rent"}`)
              }
              variant="outline"
              size="lg"
            >
              View All Properties
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}