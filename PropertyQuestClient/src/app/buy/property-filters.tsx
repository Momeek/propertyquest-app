"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";
import { PropertyType } from "@/interfaces/property.interface";
import { formatPropertyType } from "@/utils/utils";

export default function PropertyFilters({
  setSearch,
  setSelectedType,
}: {
  setSearch: (value: string) => void;
  setSelectedType: (value: string) => void;
}) {
  const [selectedPropType, setSelectedPropType] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");

  const propertyTypes: PropertyType[] = [
    "house",
    "penthouse",
    "flats/apartments",
    "mansions",
    "studio_apartment",
    "shop",
    "office_spaces",
    "self_contain",
    "lands",
    "commercial_properties",
    "duplexes",
    "shared_apartment",
    "terraces",
    "offPlan_projects",
  ];

  const handleFilter = () => {
    setSearch(searchInput);
    setSelectedType(selectedPropType);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-[#b6b3b3] space-y-6">
      {/* Search Input */}
      <div className="space-y-2">
        <Label>Location</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9"
            placeholder="Enter building..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="property-type">
          <AccordionTrigger>Property Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {propertyTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center space-x-2 cursor-pointer px-2 py-1.5 rounded hover:bg-gray-100 text-sm"
                >
                  <input
                    type="radio"
                    name="propertyType"
                    value={type}
                    checked={selectedPropType === type}
                    onChange={() => setSelectedPropType(type)}
                    className="accent-[#16a249]"
                  />
                  <span>{formatPropertyType(type)}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full" onClick={handleFilter}>
        Apply Filters
      </Button>
    </div>
  );
}