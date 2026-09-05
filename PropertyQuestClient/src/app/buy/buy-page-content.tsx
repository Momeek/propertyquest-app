"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import PropertyFilters from "./property-filters";
import PropertyList from "../rent/property-list";
import NoData from "@/components/no-data";
import { useFetchAllProperties } from "@/hooks/useFetchAllProperties";
import PropertyListSkeleton from "@/components/property-list-skeleton";
import Pagination from "@/components/pagination";

export default function BuyPageContent() {
  const searchParams = useSearchParams();

  const typeFromUrl = searchParams.get("type") || "";
  const searchTermFromUrl = searchParams.get("searchTerm") || "";

  const {
    data: saleProperties,
    isLoading,
    isFetching,
    page,
    total,
    increasePage,
    decreasePage,
    setPage,
    setSearch,
    setSelectedType,
  } = useFetchAllProperties("sale");

  useEffect(() => {
    if (typeFromUrl) {
      setSelectedType(typeFromUrl);
    }
    if (searchTermFromUrl) {
      setSearch(searchTermFromUrl);
    }
  }, [typeFromUrl, searchTermFromUrl, setSelectedType, setSearch]);

  return (
    <div className="container py-8 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 px-4">
          <div className="sticky top-20">
            <PropertyFilters
              setSearch={setSearch}
              setSelectedType={setSelectedType}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Results Info */}
          <div className="flex justify-between items-center">
            <p className="text-gray-500">
              Showing {saleProperties.length} properties
            </p>
            <select className="border border-[#b6b3b3] rounded-md px-3 py-1.5 text-sm bg-white mb-4">
              <option>Most Recent</option>
            </select>
          </div>

          {/* Property List */}
          {isFetching ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <PropertyListSkeleton key={idx} />
            ))
          ) : saleProperties && saleProperties.length > 0 ? (
            saleProperties?.map((property) => {
              return (
                <PropertyList
                  key={property?.propertyId}
                  property={property}
                  user={property?.User}
                  company="PropertyQuest"
                />
              );
            })
          ) : (
            <NoData />
          )}

          {(!isFetching || !isLoading) &&
            saleProperties &&
            saleProperties.length > 0 && (
              <div className="text-center pt-6">
                <Pagination
                  currentPage={page}
                  totalPages={total}
                  increasePage={increasePage}
                  decreasePage={decreasePage}
                  onPageChange={(page) => {
                    setPage(page);
                  }}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}