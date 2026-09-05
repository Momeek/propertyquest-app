"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash2,
  MoreHorizontal,
  ArrowUpDown,
  Heart,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PropertyAttr } from "@/interfaces/property.interface";
import {
  formatAmount,
  JSONSafeParse,
  getPropertyImagesUrl,
  formatDate,
} from "@/utils/utils";
import { nodeEnv, vercelEnv } from "@/utils/baseUrl";
import LazyImage from "../ui/lazyImage";
import NoData from "../no-data";
import PropertyTableSkeleton from "../property-table-skeleton";
import {
  getErrorMessage,
  isValidationError,
  getValidationErrors,
} from "@/utils/utils";
import { useToast } from "@/components/ui/toast";
import { useClient } from "@/hooks/useClient";
import { ConfirmDialog } from "../ui/confirmation-dialog";
import { useRouter } from "next/navigation";

interface PropertyListingsTableProps {
  listData?: PropertyAttr[];
  isFetching?: boolean;
  refetch?: () => void;
}

export default function PropertyListingsTable({
  listData,
  isFetching,
  refetch,
}: PropertyListingsTableProps) {
  const client = useClient();
  const { addToast } = useToast();
  const naviate = useRouter();
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [propertyId, setPropertyId] = useState("");

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const handleDeleteProperty = async () => {
    if (!propertyId) {
      addToast({
        title: "Error",
        description: "No property to delete",
        type: "error",
        position: "top-center",
      });
      return;
    }
    try {
      await client.delete(`/property/delete-property/${propertyId}`);
      addToast({
        title: "Success",
        description: "Property deleted",
        type: "success",
        position: "bottom-center",
      });
      refetch?.();
    } catch (error: unknown) {
      console.error("Failed to send message.:", error);
      const title = getErrorMessage(error);
      addToast({
        title: "Failed to delete property.",
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
      <div className="bg-white rounded-lg border border-[#b6b3b3] shadow-sm">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#b6b3b3] bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Property
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleSort("price")}
                  >
                    Price
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleSort("date")}
                  >
                    Listed Date
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Active
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleSort("views")}
                  >
                    Stats
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isFetching ? (
                <PropertyTableSkeleton />
              ) : listData && listData.length > 0 ? (
                listData.map((property, index) => {
                  const details = JSONSafeParse(
                    property?.details
                  ) as PropertyAttr["details"];
                  const media = JSONSafeParse(
                    property.media
                  ) as PropertyAttr["media"];
                  const location = JSONSafeParse(
                    property.location
                  ) as PropertyAttr["location"];
                  const pricing = JSONSafeParse(
                    property.pricing
                  ) as PropertyAttr["pricing"];

                  const isFeaturedImage = media?.images?.find(
                    (img) => img.isFeatured === true
                  );

                  const likeCount = Array.isArray(property?.LikedProperties)
                    ? property.LikedProperties.length
                    : 0;

                  return (
                    <tr
                      key={index}
                      className="border-b border-[#b6b3b3] hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        naviate.push(
                          `/dashboard/listings/${property.propertyId}`
                        );
                      }}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 rounded-md overflow-hidden">
                            <LazyImage
                              src={
                                vercelEnv === "production" ||
                                nodeEnv === "production"
                                  ? (isFeaturedImage?.url as string)
                                  : getPropertyImagesUrl(
                                      isFeaturedImage?.url as string
                                    ) ?? "/placeholder.svg"
                              }
                              alt="property-image"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{details?.title}</p>
                            <p className="text-sm text-gray-500">
                              {location?.city}, {location?.neighborhood}
                            </p>
                            {pricing?.isFeatured && (
                              <Badge variant="secondary" className="mt-1">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium">
                            {formatAmount(
                              (pricing?.price || pricing?.rentPrice) as number
                            )}
                          </p>
                          <p className="text-sm text-gray-500">
                            {details?.listingType}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {formatDate(property?.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            details?.status === "ready"
                              ? "default"
                              : details?.status === "under_construction"
                              ? "outline"
                              : "secondary"
                          }
                          className={
                            details?.status === "ready"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : details?.status === "under_construction"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {details?.status === "ready" && "Ready"}
                          {details?.status === "under_construction" &&
                            "Under Construction"}
                          {details?.status === "offPlan" && "Off Plan"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        <Badge
                          variant={property?.active ? "default" : "secondary"}
                          className={
                            property?.active
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {property?.active ? "Published" : "Not published"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-4">
                          <div className="relative inline-flex items-center">
                            <Heart
                              className="h-8 w-8 text-gray-400"
                              color={likeCount ? "#16a249" : "#cccc"}
                              fill={likeCount ? "#16a249" : "#ffffff"}
                            />
                            {likeCount > 0 && (
                              <span className="absolute -top-[-4px] -left-[-8px] inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-[#16a249] rounded-full">
                                {likeCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="bg-white border border-[#dddd]"
                            align="end"
                          >
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                naviate.push(
                                  `/dashboard/add-property?propertyId=${property.propertyId}`
                                );
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfirmOpen(true);
                                setPropertyId(property?.propertyId as string);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6}>
                    <NoData message="No properties found." />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          {isFetching ? (
            <div className="space-y-4 p-4 animate-pulse">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="bg-gray-200 h-20 w-20 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 w-40 rounded" />
                    <div className="h-3 bg-gray-100 w-32 rounded" />
                    <div className="h-4 bg-gray-200 w-24 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : listData && listData.length > 0 ? (
            listData.map((property) => {
              const details = JSONSafeParse(
                property?.details
              ) as PropertyAttr["details"];
              const media = JSONSafeParse(
                property.media
              ) as PropertyAttr["media"];
              const location = JSONSafeParse(
                property.location
              ) as PropertyAttr["location"];
              const pricing = JSONSafeParse(
                property.pricing
              ) as PropertyAttr["pricing"];

              const likeCount = Array.isArray(property?.LikedProperties)
                ? property.LikedProperties.length
                : 0;

              return (
                <div
                  key={property.propertyId}
                  className="border-b border-[#b6b3b3] p-4 cursor-pointer"
                  onClick={() => {
                    naviate.push(`/dashboard/listings/${property.propertyId}`);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                      <LazyImage
                        src={
                          vercelEnv === "production" || nodeEnv === "production"
                            ? (media?.images?.[0]?.url as string)
                            : getPropertyImagesUrl(
                                media?.images?.[0]?.url as string
                              ) ?? "/placeholder.svg"
                        }
                        alt="property-image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium truncate">
                          {details?.title}
                        </h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="-mr-2 -mt-1"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="bg-white border border-[#dddd]"
                            align="end"
                          >
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                naviate.push(
                                  `/dashboard/add-property?propertyId=${property.propertyId}`
                                );
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfirmOpen(true);
                                setPropertyId(property?.propertyId as string);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {location?.address}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="font-medium">
                          {formatAmount(
                            (pricing?.price || pricing?.rentPrice) as number
                          )}
                        </p>
                        <Badge
                          variant={
                            details?.status === "ready"
                              ? "default"
                              : details?.status === "under_construction"
                              ? "outline"
                              : "secondary"
                          }
                          className={
                            details?.status === "ready"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : details?.status === "under_construction"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {details?.status === "ready" && "Ready"}
                          {details?.status === "under_construction" &&
                            "Under Construction"}
                          {details?.status === "offPlan" && "Off Plan"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <div className="relative inline-flex items-center">
                            <Heart
                              className="h-5 w-5 text-gray-400"
                              color={likeCount ? "#16a249" : "#cccc"}
                              fill={likeCount ? "#16a249" : "#ffffff"}
                            />
                            {likeCount > 0 && (
                              <span className="absolute -top-[-6px] -left-[-7px] inline-flex items-center justify-center w-1 h-1 text-xs font-bold text-white bg-[#16a249] rounded-full">
                                {likeCount}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span>{formatDate(property?.createdAt)}</span>
                        </div>
                        <div>
                          <Badge
                            variant={property?.active ? "default" : "secondary"}
                            className={
                              property?.active
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            }
                          >
                            {property?.active ? "Published" : "Not published"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <NoData message="No properties found." />
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete this property?"
        description="This will be permanently removed your list of properties."
        confirmText="Remove"
        cancelText="Cancel"
        onConfirm={handleDeleteProperty}
        icon={<Trash2 className="h-5 w-5 text-red-500" />}
      />
    </>
  );
}