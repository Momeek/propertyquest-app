"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useClient } from "@/hooks/useClient";
import {
  PropertyAttr,
  PropertyLikesAttr,
} from "@/interfaces/property.interface";
import { AxiosError } from "axios";
import { JSONSafeParse } from "@/utils/utils";
import PropertyCardSkeleton from "../property-card-skeleton-loader";
import { useCurrentUserStore } from "@/store/auth.store";
import LikePropertyCard from "../like-property-card";
import { useMemo, useCallback } from "react";

// Pre-defined array for skeletons to avoid Array.from on every render
const SKELETON_ITEMS = [1, 2, 3];

const EMPTY_STATE = (
  <div className="bg-white rounded-lg border p-8 text-center">
    <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-medium mb-2">No Saved Properties Yet</h3>
    <p className="text-gray-500 mb-6">
      Save properties you like to compare them later.
    </p>
    <Button asChild>
      <Link href="/buy">Browse Properties</Link>
    </Button>
  </div>
);

const LOADING_STATE = (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {SKELETON_ITEMS.map((item) => (
      <PropertyCardSkeleton key={item} />
    ))}
  </div>
);

export default function FavoriteProperties() {
  const client = useClient();
  const { user } = useCurrentUserStore();

  const {
    data: property,
    isLoading,
    refetch,
  } = useQuery<PropertyLikesAttr[], AxiosError>({
    queryKey: ["userId", user?.userId],
    queryFn: async () =>
      client
        .get(`/property/liked-property/${user?.userId}`)
        .then((res) => res.data.data?.likedProperties),
    // Removed refetchOnMount: "always" - rely on React Query's default caching
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep unused data for 10 minutes
    enabled: !!user?.userId,
  });

  // Memoize the parsed properties to avoid re-parsing on every render
  const parsedProperties = useMemo(() => {
    if (!property?.length) return [];

    return property.map((likePro) => {
      const details = JSONSafeParse(
        likePro?.Property?.details
      ) as PropertyAttr["details"];
      const media = JSONSafeParse(
        likePro?.Property?.media
      ) as PropertyAttr["media"];
      const location = JSONSafeParse(
        likePro?.Property?.location
      ) as PropertyAttr["location"];
      const pricing = JSONSafeParse(
        likePro?.Property?.pricing
      ) as PropertyAttr["pricing"];

      return {
        likeId: likePro?.likeId,
        propertyId: likePro?.Property?.propertyId,
        details,
        media,
        location,
        pricing,
        LikedProperties: likePro,
        createdAt: likePro.createdAt,
      };
    });
  }, [property]);

  // Memoize refetch callback to maintain referential equality
  const memoizedRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return LOADING_STATE;
  }

  if (!property || property.length === 0) {
    return EMPTY_STATE;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {parsedProperties.map((propertyData) => (
        <LikePropertyCard
          key={propertyData.likeId}
          propertyId={propertyData.propertyId}
          details={propertyData.details}
          location={propertyData.location}
          media={propertyData.media}
          pricing={propertyData.pricing}
          LikedProperties={propertyData.LikedProperties}
          createdAt={propertyData.createdAt}
          refetch={memoizedRefetch}
          length={parsedProperties.length}
        />
      ))}
    </div>
  );
}