"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  MapPin,
  Home,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const neighborhoods = [
  {
    id: "downtown",
    name: "Downtown",
    avgPrice: 650000,
    priceChange: 7.5,
    inventory: 124,
    daysOnMarket: 28,
    propertyTypes: {
      apartment: 65,
      condo: 25,
      townhouse: 8,
      house: 2,
    },
    image: "/placeholder.svg?height=200&width=300",
    trend: "up",
    description:
      "The downtown area continues to see strong demand, particularly for luxury condos and apartments. Proximity to business districts and amenities drives premium pricing.",
  },
  {
    id: "suburban",
    name: "Suburban District",
    avgPrice: 520000,
    priceChange: 9.2,
    inventory: 215,
    daysOnMarket: 35,
    propertyTypes: {
      apartment: 15,
      condo: 20,
      townhouse: 25,
      house: 40,
    },
    image: "/placeholder.svg?height=200&width=300",
    trend: "up",
    description:
      "Suburban areas are experiencing significant growth as buyers seek more space. Single-family homes are in particularly high demand, with limited inventory driving price increases.",
  },
  {
    id: "coastal",
    name: "Coastal Area",
    avgPrice: 850000,
    priceChange: 12.3,
    inventory: 86,
    daysOnMarket: 22,
    propertyTypes: {
      apartment: 30,
      condo: 40,
      townhouse: 15,
      house: 15,
    },
    image: "/placeholder.svg?height=200&width=300",
    trend: "up",
    description:
      "Waterfront properties continue to command premium prices with strong appreciation. Limited new development and high demand from luxury buyers maintain upward pressure on prices.",
  },
  {
    id: "historic",
    name: "Historic District",
    avgPrice: 580000,
    priceChange: 5.8,
    inventory: 62,
    daysOnMarket: 42,
    propertyTypes: {
      apartment: 25,
      condo: 30,
      townhouse: 35,
      house: 10,
    },
    image: "/placeholder.svg?height=200&width=300",
    trend: "up",
    description:
      "The historic district offers unique character and charm, attracting buyers looking for distinctive properties. Renovation costs and preservation requirements moderate price growth.",
  },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export default function NeighborhoodAnalysis() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(
    neighborhoods[0]
  );

  const propertyTypeData = Object.entries(
    selectedNeighborhood.propertyTypes
  ).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const priceComparisonData = neighborhoods.map((n) => ({
    name: n.name,
    price: n.avgPrice,
  }));

  return (
    <div className="space-y-8">
      <Tabs
        defaultValue={neighborhoods[0].id}
        onValueChange={(value) => {
          const neighborhood = neighborhoods.find((n) => n.id === value);
          if (neighborhood) setSelectedNeighborhood(neighborhood);
        }}
      >
        <div className="overflow-x-auto">
          <TabsList className="mb-8 flex-nowrap">
            {neighborhoods.map((neighborhood) => (
              <TabsTrigger key={neighborhood.id} value={neighborhood.id}>
                {neighborhood.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {neighborhoods.map((neighborhood) => (
          <TabsContent key={neighborhood.id} value={neighborhood.id}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Neighborhood Overview */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>{neighborhood.name} Overview</CardTitle>
                  <CardDescription>
                    Current market conditions and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="relative h-48 md:h-auto md:w-1/3 rounded-lg overflow-hidden">
                      <Image
                        src={neighborhood.image || "/placeholder.svg"}
                        alt={neighborhood.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex items-center mb-4">
                        <Badge
                          className={`${
                            neighborhood.trend === "up"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {neighborhood.trend === "up" ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {neighborhood.priceChange}% price change
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-4">
                        {neighborhood.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <DollarSign className="h-4 w-4 mr-1" />
                            Avg. Price
                          </div>
                          <p className="font-medium">
                            ${neighborhood.avgPrice.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <Home className="h-4 w-4 mr-1" />
                            Inventory
                          </div>
                          <p className="font-medium">
                            {neighborhood.inventory} listings
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            Days on Market
                          </div>
                          <p className="font-medium">
                            {neighborhood.daysOnMarket} days
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            Market Status
                          </div>
                          <p className="font-medium">
                            {neighborhood.trend === "up"
                              ? "Seller's Market"
                              : "Buyer's Market"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium mb-4">Price Comparison</h4>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={priceComparisonData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [
                              `$${value.toLocaleString()}`,
                              "Average Price",
                            ]}
                          />
                          <Bar dataKey="price" fill="#16a249" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Property Type Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Types</CardTitle>
                  <CardDescription>
                    Distribution by property type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={propertyTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        />
                        <Tooltip
                          formatter={(value) => [`${value} properties`, ""]}
                        />
                        {propertyTypeData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-6 space-y-2">
                    {propertyTypeData.map((entry, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div
                            className="h-3 w-3 rounded-full mr-2"
                            style={{
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          ></div>
                          <span>{entry.name}</span>
                        </div>
                        <span className="font-medium">
                          {entry.value} properties
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-6">
                    View Properties in {neighborhood.name}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
