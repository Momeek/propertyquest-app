"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Building, Home } from "lucide-react";

export default function ProjectSearch() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [completionStatus, setCompletionStatus] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Location"
            className="pl-10"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger>
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Property Type" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white border border-[#dddd]">
            <SelectItem className="hover:text-[#16a249]" value="apartment">
              Apartments
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="villa">
              Villas
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="townhouse">
              Townhouses
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="penthouse">
              Penthouses
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="mixed">
              Mixed Use
            </SelectItem>
          </SelectContent>
        </Select>

        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <div className="flex items-center">
              <Home className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Price Range" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white border border-[#dddd]">
            <SelectItem className="hover:text-[#16a249]" value="under-500k">
              Under $500K
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="500k-1m">
              $500K - $1M
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="1m-2m">
              $1M - $2M
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="2m-5m">
              $2M - $5M
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="above-5m">
              Above $5M
            </SelectItem>
          </SelectContent>
        </Select>

        <Select value={completionStatus} onValueChange={setCompletionStatus}>
          <SelectTrigger>
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Completion Status" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white border border-[#dddd]">
            <SelectItem className="hover:text-[#16a249]" value="off-plan">
              Off-Plan
            </SelectItem>
            <SelectItem
              className="hover:text-[#16a249]"
              value="under-construction"
            >
              Under Construction
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="ready">
              Ready to Move In
            </SelectItem>
            <SelectItem
              className="hover:text-[#16a249]"
              value="recently-completed"
            >
              Recently Completed
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4">
        <Button className="w-full md:w-auto">
          <Search className="h-4 w-4 mr-2" />
          Search Projects
        </Button>
      </div>
    </div>
  );
}
