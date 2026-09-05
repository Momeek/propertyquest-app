"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import PropertyListingsTable from "@/components/dashboard/property-listings-table";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { useClient } from "@/hooks/useClient";
import { PropertyAttr } from "@/interfaces/property.interface";
import { useCurrentUserStore } from "@/store/auth.store";
// import { useDebounce } from "@/hooks/useDebounce";
import Pagination from "@/components/pagination";

export default function MyListingsPage() {
  const client = useClient();
  const { user } = useCurrentUserStore();

  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);
  // TODO: Add search filters in future, on client here
  // const [search, setSearch] = useState<string | undefined>();
  // const debouncedSearch = useDebounce(search, 600);

  const increasePage = () => page < total && setPage((prev) => prev + 1);
  const decreasePage = () => page > 1 && setPage((prev) => prev - 1);

  const { data, isFetching, refetch } = useQuery<
    {
      properties: PropertyAttr[];
    },
    AxiosError
  >({
    queryKey: [
      "property",
      user.userId,
      page,
      // debouncedSearch
    ],
    queryFn: async () => {
      const response = await client
        // .get(`/property/${user.userId}?title=${debouncedSearch || ""}&page=${page}&limit=5`);
        .get(`/property/${user.userId}?page=${page}&limit=10`);
      const result = response?.data?.data;

      if (result?.meta) {
        const totalPages = Math.max(1, result.meta.totalPages);
        setTotal(totalPages);
      }
      return result;
    },
    enabled: !!user.userId,
    initialData: {
      properties: [],
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">My Listings</h1>
          <p className="text-gray-500">Manage your property listings</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/add-property">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Property
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Listings</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <PropertyListingsTable
            listData={data.properties}
            isFetching={isFetching}
            refetch={refetch}
          />
        </TabsContent>
      </Tabs>

      {!isFetching && data && data.properties?.length > 0 && (
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
  );
}
