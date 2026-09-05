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
import { Search, MapPin, Briefcase } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AgentSearch() {
  const [searchType, setSearchType] = useState("agents");

  return (
    <div className="bg-white rounded-lg shadow-lg p-1">
      <Tabs defaultValue="agents" onValueChange={setSearchType}>
        <TabsList className="grid grid-cols-2 content-center mb-4 p-1">
          <TabsTrigger className="mt-[-3px]" value="agents">
            Find Agents
          </TabsTrigger>
          <TabsTrigger className="mt-[-3px]" value="agencies">
            Find Agencies
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col md:flex-row gap-2 p-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder={
              searchType === "agents"
                ? "Agent name or location"
                : "Agency name or location"
            }
            className="pl-10"
          />
        </div>

        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Specialization" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white border border-[#dddd]">
            <SelectItem className="hover:text-[#16a249]" value="residential">
              Residential
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="commercial">
              Commercial
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="luxury">
              Luxury
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="investment">
              Investment
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="international">
              International
            </SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Location" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white border border-[#dddd]">
            <SelectItem className="hover:text-[#16a249]" value="downtown">
              Downtown
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="uptown">
              Uptown
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="suburbs">
              Suburbs
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="beachfront">
              Beachfront
            </SelectItem>
            <SelectItem className="hover:text-[#16a249]" value="all">
              All Locations
            </SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" className="md:w-auto">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
}
