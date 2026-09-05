import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  MessageCircle,
  Award,
  CheckCircle,
  Home,
  Building,
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  photo: string;
  agency: string;
  agencyLogo: string;
  rating: number;
  reviewCount: number;
  specialty: string;
  languages: string[];
  propertiesCount: {
    sale: number;
    rent: number;
  };
  verified: boolean;
  featured: boolean;
  experience: number;
}

const featuredAgents: Agent[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    photo: "/user.jpg",
    agency: "Luxury Homes Realty",
    agencyLogo: "/agency-logo.png",
    rating: 4.9,
    reviewCount: 124,
    specialty: "Luxury Properties",
    languages: ["English", "Spanish"],
    propertiesCount: {
      sale: 28,
      rent: 12,
    },
    verified: true,
    featured: true,
    experience: 8,
  },
  {
    id: "2",
    name: "Michael Chen",
    photo: "/user.jpg",
    agency: "City Properties",
    agencyLogo: "/agency-logo.png",
    rating: 4.8,
    reviewCount: 98,
    specialty: "Downtown Condos",
    languages: ["English", "Mandarin", "Cantonese"],
    propertiesCount: {
      sale: 15,
      rent: 24,
    },
    verified: true,
    featured: true,
    experience: 6,
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    photo: "/user.jpg",
    agency: "Coastal Realty Group",
    agencyLogo: "/agency-logo.png",
    rating: 4.7,
    reviewCount: 86,
    specialty: "Beachfront Properties",
    languages: ["English", "Spanish"],
    propertiesCount: {
      sale: 22,
      rent: 9,
    },
    verified: true,
    featured: true,
    experience: 5,
  },
  {
    id: "4",
    name: "David Wilson",
    photo: "/user.jpg",
    agency: "Investment Properties Inc.",
    agencyLogo: "/agency-logo.png",
    rating: 4.9,
    reviewCount: 112,
    specialty: "Investment Properties",
    languages: ["English", "French"],
    propertiesCount: {
      sale: 31,
      rent: 7,
    },
    verified: true,
    featured: true,
    experience: 12,
  },
];

export default function FeaturedAgents() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredAgents.map((agent) => (
        <Link href={`/agents/${agent.id}`} key={agent.id}>
          <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative">
              <div className="relative h-64 w-full">
                <Image
                  src={agent.photo || "/placeholder.svg"}
                  alt={agent.name}
                  fill
                  className="object-cover"
                />
              </div>
              {agent.featured && (
                <Badge className="absolute top-3 left-3 bg-primary">
                  <Award className="h-3 w-3 mr-1" />
                  Top Agent
                </Badge>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center text-white">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 font-medium">{agent.rating}</span>
                  <span className="mx-1 text-xs">
                    ({agent.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-bold text-lg flex items-center">
                    {agent.name}
                    {agent.verified && (
                      <CheckCircle className="h-4 w-4 ml-1 text-blue-500" />
                    )}
                  </h3>
                  <p className="text-sm text-gray-500">{agent.specialty}</p>
                </div>
                <div className="h-10 w-10 relative">
                  <Image
                    src={agent.agencyLogo || "/placeholder.svg"}
                    alt={agent.agency}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Building className="h-4 w-4 mr-1" />
                {agent.agency} • {agent.experience} years
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {agent.languages.map((language) => (
                  <Badge key={language} variant="outline" className="text-xs">
                    {language}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between text-sm">
                <div className="flex items-center">
                  <Home className="h-4 w-4 mr-1 text-gray-500" />
                  <span>For Sale: {agent.propertiesCount.sale}</span>
                </div>
                <div className="flex items-center">
                  <Home className="h-4 w-4 mr-1 text-gray-500" />
                  <span>For Rent: {agent.propertiesCount.rent}</span>
                </div>
              </div>

              <Button className="w-full mt-4 gap-2">
                <MessageCircle className="h-4 w-4" />
                Contact Agent
              </Button>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
