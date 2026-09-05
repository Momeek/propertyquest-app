"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { PropertyType } from "@/interfaces/property.interface";
import { formatPropertyType } from "@/utils/utils";

export default function SearchForm() {
  const router = useRouter();
  const [searchType, setSearchType] = useState("buy");
  const [selectedPropType, setSelectedPropType] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");

  const propertyOptions: PropertyType[] = [
    "house",
    "shared_apartment",
    "penthouse",
    "studio_apartment",
    "shop",
    "flats/apartments",
    "office_spaces",
    "mansions",
    "self_contain",
    "terraces",
    "commercial_properties",
    "duplexes",
    "lands",
    "offPlan_projects",
  ];

  const handleSearch = () => {
    if (searchType === "buy") {
      router.push(`/buy?type=${selectedPropType}&searchTerm=${searchInput}`);
      return;
    }
    if (searchType === "rent") {
      router.push(`/rent?type=${selectedPropType}&searchTerm=${searchInput}`);
      return;
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-1">
      <div className="flex border-b border-[#dddd] mb-4">
        {["buy", "rent"].map((type) => (
          <button
            key={type}
            className={`px-6 py-3 text-sm font-medium ${
              searchType === type
                ? "border-b-2 border-[#16a249] text-[#16a249]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setSearchType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-2 p-2">
        <div className="relative flex-grow">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Enter Building.."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          {/* Property Type Dropdown */}
          <select
            className="h-10 rounded-md border border-[#dddd] px-3 py-2 text-sm"
            value={selectedPropType}
            onChange={(e) => setSelectedPropType(e.target.value)}
          >
            <option value="">Property Type</option>
            {propertyOptions.map((property) => (
              <option key={property} value={property}>
                {formatPropertyType(property)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="cursor-pointer hover:bg-gray-200"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}