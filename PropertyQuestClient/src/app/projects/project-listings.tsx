"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Building, Calendar, Heart, Share2 } from "lucide-react";

interface Project {
  id: string;
  name: string;
  developer: string;
  location: string;
  completionDate: string;
  priceRange: string;
  propertyTypes: string[];
  image: string;
  status: "Off-Plan" | "Under Construction" | "Ready" | "Recently Completed";
  featured: boolean;
  description: string;
}

const projects: Project[] = [
  {
    id: "skyline-towers",
    name: "Skyline Towers",
    developer: "Premier Developers",
    location: "Downtown, Metro City",
    completionDate: "Q4 2025",
    priceRange: "$500K - $2M",
    propertyTypes: ["Apartments", "Penthouses"],
    image: "/placeholder.svg?height=400&width=600",
    status: "Off-Plan",
    featured: true,
    description:
      "Luxury residential towers with panoramic city views, premium amenities, and smart home technology.",
  },
  {
    id: "marina-heights",
    name: "Marina Heights",
    developer: "Coastal Developments",
    location: "Marina District, Metro City",
    completionDate: "Q2 2024",
    priceRange: "$800K - $3M",
    propertyTypes: ["Apartments", "Penthouses", "Retail"],
    image: "/placeholder.svg?height=400&width=600",
    status: "Under Construction",
    featured: true,
    description:
      "Waterfront living with direct marina access, private boat slips, and resort-style amenities.",
  },
  {
    id: "garden-villas",
    name: "Garden Villas",
    developer: "Green Living Developers",
    location: "Suburban District, Metro City",
    completionDate: "Q1 2024",
    priceRange: "$1.2M - $4M",
    propertyTypes: ["Villas", "Townhouses"],
    image: "/placeholder.svg?height=400&width=600",
    status: "Under Construction",
    featured: true,
    description:
      "Eco-friendly community with spacious villas, sustainable design, and extensive green spaces.",
  },
  {
    id: "urban-lofts",
    name: "Urban Lofts",
    developer: "City Space Developers",
    location: "Arts District, Metro City",
    completionDate: "Q3 2024",
    priceRange: "$400K - $900K",
    propertyTypes: ["Lofts", "Studios", "Retail"],
    image: "/placeholder.svg?height=400&width=600",
    status: "Under Construction",
    featured: false,
    description:
      "Modern loft-style apartments in the vibrant arts district with co-working spaces and creative amenities.",
  },
  {
    id: "sunset-residences",
    name: "Sunset Residences",
    developer: "Horizon Properties",
    location: "Coastal District, Metro City",
    completionDate: "Q4 2023",
    priceRange: "$600K - $1.8M",
    propertyTypes: ["Apartments", "Duplexes"],
    image: "/placeholder.svg?height=400&width=600",
    status: "Ready",
    featured: false,
    description:
      "Beachfront residences with stunning sunset views, infinity pools, and direct beach access.",
  },
  {
    id: "tech-hub-offices",
    name: "Tech Hub Offices",
    developer: "Innovation Builders",
    location: "Business District, Metro City",
    completionDate: "Q1 2025",
    priceRange: "$800K - $5M",
    propertyTypes: ["Offices", "Co-working", "Retail"],
    image: "/placeholder.svg?height=400&width=600",
    status: "Off-Plan",
    featured: false,
    description:
      "State-of-the-art office spaces designed for tech companies with advanced infrastructure and amenities.",
  },
];

export default function ProjectListings() {
  const [activeTab, setActiveTab] = useState("all");
  const [savedProjects, setSavedProjects] = useState<string[]>([]);

  const toggleSave = (e: React.MouseEvent, projectId: string) => {
    e.preventDefault();
    setSavedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    // Share functionality would go here
  };

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => {
          if (activeTab === "off-plan") return p.status === "Off-Plan";
          if (activeTab === "under-construction")
            return p.status === "Under Construction";
          if (activeTab === "ready")
            return p.status === "Ready" || p.status === "Recently Completed";
          return true;
        });

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="overflow-x-auto">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="flex-nowrap">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="off-plan">Off-Plan</TabsTrigger>
              <TabsTrigger value="under-construction">
                Under Construction
              </TabsTrigger>
              <TabsTrigger value="ready">Ready to Move In</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <select className="border border-[#b6b3b3] rounded-md px-3 py-1.5 text-sm bg-white">
          <option>Latest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Completion Date</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary">{project.status}</Badge>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    className="bg-white/90 p-1.5 rounded-full hover:bg-white"
                    onClick={(e) => handleShare(e)}
                  >
                    <Share2 className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    className="bg-white/90 p-1.5 rounded-full hover:bg-white"
                    onClick={(e) => toggleSave(e, project.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        savedProjects.includes(project.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <div className="flex items-center mb-1 text-sm text-gray-500">
                  <Building className="h-4 w-4 mr-1" />
                  <span>{project.developer}</span>
                </div>
                <div className="flex items-center mb-3 text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{project.location}</span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.propertyTypes.map((type) => (
                    <Badge key={type} variant="outline" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[#b6b3b3]">
                  <div>
                    <span className="text-xs text-gray-500">Starting From</span>
                    <p className="font-medium text-[#16a249]">
                      {project.priceRange}
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{project.completionDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" size="lg">
          Load More Projects
        </Button>
      </div>
    </div>
  );
}
