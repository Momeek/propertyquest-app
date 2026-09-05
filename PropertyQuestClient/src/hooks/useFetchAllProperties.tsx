import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useClient } from "./useClient";
import { PropertyAttr } from "@/interfaces/property.interface";
import { AxiosError } from "axios";
import { JSONSafeParse } from "@/utils/utils";
import { useDebounce } from "./useDebounce";

export const useFetchAllProperties = (listingType?: "rent" | "sale") => {
  const client = useClient();

  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [search, setSearch] = useState<string | undefined>();
  const debouncedSearch = useDebounce(search, 600);

  const increasePage = () => page < total && setPage((prev) => prev + 1);
  const decreasePage = () => page > 1 && setPage((prev) => prev - 1);

  // Build query params
  const getQueryParams = () => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", "5");
    params.append("listingType", listingType || "");
    if (selectedType) params.append("propertyType", selectedType);
    if (debouncedSearch) params.append("title", debouncedSearch);

    return params.toString();
  };

  const { data, isFetching, isLoading, isError } = useQuery<
    PropertyAttr[],
    AxiosError
  >({
    queryKey: [
      "all-property",
      page,
      listingType,
      selectedType,
      debouncedSearch,
    ],
    queryFn: async () => {
      const queryParams = getQueryParams();
      const response = await client.get(`/properties?${queryParams}`, false);
      const result = response?.data?.data;

      if (result?.meta) {
        const totalPages = Math.max(1, result.meta.totalPages);
        setTotal(totalPages);
      }

      return result?.properties || [];
    },
    refetchOnMount: "always",
    initialData: [],
  });

  const filteredProperties = data?.filter((property) => {
    const details = JSONSafeParse(property?.details) as PropertyAttr["details"];
    return details?.listingType === listingType;
  });

  return {
    data: filteredProperties,
    isLoading,
    isError,
    isFetching,
    page,
    total,
    increasePage,
    decreasePage,
    setPage,
    setSearch,
    setSelectedType,
  };
};
