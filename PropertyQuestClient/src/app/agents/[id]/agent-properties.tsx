"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Bed, Bath, Maximize } from "lucide-react";

interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  priceType: "sale" | "rent";
  beds: number;
  baths: number;
  area: number;
  image: string;
  isNew: boolean;
  isFeatured: boolean;
}

// This would typically come from an API based on the agent ID
const agentProperties: Property[] = [
  {
    id: "1",
    title: "Luxury Waterfront Villa",
    type: "Villa",
    location: "Beachfront, Metro City",
    price: 2500000,
    priceType: "sale",
    beds: 5,
    baths: 4,
    area: 4200,
    image: "/placeholder.svg?height=300&width=400",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Modern Downtown Penthouse",
    type: "Penthouse",
    location: "Downtown, Metro City",
    price: 1800000,
    priceType: "sale",
    beds: 3,
    baths: 3,
    area: 2800,
    image: "/placeholder.svg?height=300&width=400",
    isNew: false,
    isFeatured: true,
  },
  {
    id: "3",
    title: "Elegant Beachside Apartment",
    type: "Apartment",
    location: "Beachfront, Metro City",
    price: 4500,
    priceType: "rent",
    beds: 2,
    baths: 2,
    area: 1500,
    image: "/placeholder.svg?height=300&width=400",
    isNew: false,
    isFeatured: false,
  },
  {
    id: "4",
    title: "Spacious Family Home",
    type: "House",
    location: "Suburbs, Metro City",
    price: 950000,
    priceType: "sale",
    beds: 4,
    baths: 3,
    area: 3200,
    image: "/placeholder.svg?height=300&width=400",
    isNew: true,
    isFeatured: false,
  },
];

export default function AgentProperties({ agentId }: { agentId: string }) {
  const [activeTab, setActiveTab] = useState("all");
  const [savedProperties, setSavedProperties] = useState<string[]>([]);

  const toggleSave = (e: React.MouseEvent, propertyId: string) => {
    e.preventDefault();
    setSavedProperties((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  console.log({ agentId });

  const filteredProperties =
    activeTab === "all"
      ? agentProperties
      : agentProperties.filter((p) =>
          activeTab === "sale" ? p.priceType === "sale" : p.priceType === "rent"
        );

  return (
    <div className="bg-white rounded-lg border border-[#dddd] p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Properties</h2>
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sale">For Sale</TabsTrigger>
            <TabsTrigger value="rent">For Rent</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProperties.map((property) => (
          <Link href={`/properties/${property.id}`} key={property.id}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
              <div className="relative h-48">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  {property.isNew && <Badge variant="default">New</Badge>}
                  {property.isFeatured && (
                    <Badge variant="secondary">Featured</Badge>
                  )}
                </div>
                <button
                  className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full hover:bg-white"
                  onClick={(e) => toggleSave(e, property.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      savedProperties.includes(property.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              </div>

              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg line-clamp-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                  </div>
                  <Badge variant="outline">{property.type}</Badge>
                </div>

                <div className="text-lg font-bold text-[#16a249] mt-2">
                  {property.priceType === "sale"
                    ? `$${property.price.toLocaleString()}`
                    : `$${property.price.toLocaleString()}/mo`}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#dddd] text-sm">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{property.beds} beds</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{property.baths} baths</span>
                  </div>
                  <div className="flex items-center">
                    <Maximize className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{property.area} sq ft</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No properties found.</p>
        </div>
      )}

      {filteredProperties.length > 0 && (
        <div className="mt-6 text-center">
          <Button variant="outline">View All Properties</Button>
        </div>
      )}
    </div>
  );
}
