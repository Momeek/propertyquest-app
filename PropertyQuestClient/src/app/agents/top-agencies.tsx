import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, MapPin, Building, ExternalLink } from "lucide-react";

interface Agency {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  agentCount: number;
  established: number;
  locations: string[];
  specialties: string[];
  propertiesCount: {
    sale: number;
    rent: number;
  };
  verified: boolean;
}

const topAgencies: Agency[] = [
  {
    id: "1",
    name: "Luxury Homes Realty",
    logo: "/agency-logo.png",
    coverImage: "/placeholder.svg?height=200&width=400",
    rating: 4.8,
    reviewCount: 324,
    agentCount: 45,
    established: 2005,
    locations: ["Downtown", "Uptown", "Beachfront"],
    specialties: ["Luxury", "Residential", "Commercial"],
    propertiesCount: {
      sale: 128,
      rent: 76,
    },
    verified: true,
  },
  {
    id: "2",
    name: "City Properties Group",
    logo: "/agency-logo.png",
    coverImage: "/placeholder.svg?height=200&width=400",
    rating: 4.7,
    reviewCount: 286,
    agentCount: 38,
    established: 2008,
    locations: ["Downtown", "Midtown", "Suburbs"],
    specialties: ["Residential", "New Developments"],
    propertiesCount: {
      sale: 95,
      rent: 142,
    },
    verified: true,
  },
  {
    id: "3",
    name: "Investment Properties Inc.",
    logo: "/agency-logo.png",
    coverImage: "/placeholder.svg?height=200&width=400",
    rating: 4.9,
    reviewCount: 198,
    agentCount: 22,
    established: 2010,
    locations: ["Financial District", "Commercial Zone"],
    specialties: ["Investment", "Commercial", "Industrial"],
    propertiesCount: {
      sale: 87,
      rent: 34,
    },
    verified: true,
  },
];

export default function TopAgencies() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {topAgencies.map((agency) => (
        <Link href={`/agencies/${agency.id}`} key={agency.id}>
          <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative h-40">
              <Image
                src={agency.coverImage || "/placeholder.svg"}
                alt={agency.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center">
                  <div className="h-16 w-16 relative bg-white rounded-md p-1 mr-3">
                    <Image
                      src={agency.logo || "/placeholder.svg"}
                      alt={agency.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-white">
                    <h3 className="font-bold text-lg">{agency.name}</h3>
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span>{agency.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{agency.reviewCount} reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Users className="h-4 w-4 mr-1" />
                <span>{agency.agentCount} Agents</span>
                <span className="mx-1">•</span>
                <span>Est. {agency.established}</span>
              </div>

              <div className="flex items-start gap-1 mb-3">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                <div className="flex flex-wrap gap-1">
                  {agency.locations.map((location, index) => (
                    <span key={location} className="text-sm">
                      {location}
                      {index < agency.locations.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {agency.specialties.map((specialty) => (
                  <Badge key={specialty} variant="outline" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between text-sm">
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-1 text-gray-500" />
                  <span>For Sale: {agency.propertiesCount.sale}</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-1 text-gray-500" />
                  <span>For Rent: {agency.propertiesCount.rent}</span>
                </div>
              </div>

              <Button className="w-full mt-4 gap-2">
                <ExternalLink className="h-4 w-4" />
                View Agency
              </Button>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
