// components/property-card-skeleton.tsx
import React from "react";
import { Card } from "@/components/ui/card";

export default function PropertyListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-6 mb-4">
        <Card className="overflow-hidden p-4 animate-pulse">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Image Section */}
            <div className="relative h-48 md:h-full rounded-lg overflow-hidden bg-gray-200" />

            {/* Content Section */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-6 w-48 bg-gray-200 rounded" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>
                <div className="h-8 w-24 bg-gray-200 rounded" />
              </div>

              <div className="flex items-center gap-4">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#b6b3b3]">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-gray-200 rounded-full" />
                  <div className="space-y-1">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                    <div className="h-3 w-28 bg-gray-200 rounded" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="h-8 w-8 bg-gray-200 rounded" />
                  <div className="h-8 w-8 bg-gray-200 rounded" />
                  <div className="h-8 w-24 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
