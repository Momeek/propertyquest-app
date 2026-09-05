import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building, ArrowRight } from "lucide-react";

interface FeaturedProject {
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
}

const featuredProjects: FeaturedProject[] = [
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
  },
];

export default function FeaturedProjects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {featuredProjects.map((project) => (
        <Link href={`/projects/${project.id}`} key={project.id}>
          <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
            <div className="relative h-64 w-full">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute top-3 left-3">
                <Badge className="bg-primary">{project.status}</Badge>
              </div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                <div className="flex items-center mb-1">
                  <Building className="h-4 w-4 mr-1" />
                  <span className="text-sm">{project.developer}</span>
                </div>
                <div className="flex items-center mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{project.location}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.propertyTypes.map((type) => (
                    <Badge
                      key={type}
                      variant="secondary"
                      className="bg-white/20 hover:bg-white/30"
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">Starting From</span>
                  <p className="font-medium">{project.priceRange}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">Completion</span>
                  <p className="font-medium">{project.completionDate}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4 justify-between text-[#16a249]"
              >
                View Project <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
