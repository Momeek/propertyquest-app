// components/property-card-skeleton.tsx
import React from "react";

export default function PropertyCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 animate-pulse space-y-4">
      <div className="bg-gray-300 h-40 w-full rounded-md" />
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-4 bg-gray-300 rounded w-1/2" />
      <div className="h-4 bg-gray-300 rounded w-1/4" />
    </div>
  );
}
