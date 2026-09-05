import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, MapPin, Award, Star } from "lucide-react"

interface Developer {
  id: string
  name: string
  logo: string
  established: number
  projectsCount: number
  rating: number
  reviewCount: number
  locations: string[]
  specialties: string[]
  featured: boolean
}

const developers: Developer[] = [
  {
    id: "premier-developers",
    name: "Premier Developers",
    logo: "/placeholder.svg?height=100&width=100",
    established: 2005,
    projectsCount: 28,
    rating: 4.8,
    reviewCount: 156,
    locations: ["Downtown", "Marina District", "Uptown"],
    specialties: ["Luxury", "Residential", "Mixed-Use"],
    featured: true,
  },
  {
    id: "coastal-developments",
    name: "Coastal Developments",
    logo: "/placeholder.svg?height=100&width=100",
    established: 2008,
    projectsCount: 22,
    rating: 4.7,
    reviewCount: 132,
    locations: ["Marina District", "Coastal Areas", "Waterfront"],
    specialties: ["Waterfront", "Residential", "Hospitality"],
    featured: true,
  },
  {
    id: "green-living-developers",
    name: "Green Living Developers",
    logo: "/placeholder.svg?height=100&width=100",
    established: 2010,
    projectsCount: 18,
    rating: 4.9,
    reviewCount: 98,
    locations: ["Suburban District", "Green Belt", "Eco Zones"],
    specialties: ["Eco-Friendly", "Sustainable", "Residential"],
    featured: true,
  },
  {
    id: "innovation-builders",
    name: "Innovation Builders",
    logo: "/placeholder.svg?height=100&width=100",
    established: 2012,
    projectsCount: 15,
    rating: 4.6,
    reviewCount: 87,
    locations: ["Business District", "Tech Hub", "Innovation Park"],
    specialties: ["Commercial", "Smart Buildings", "Tech Infrastructure"],
    featured: false,
  },
]

export default function ProjectDevelopers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {developers.map((developer) => (
        <Link href={`/developers/${developer.id}`} key={developer.id}>
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative h-20 w-20 mb-4">
                  <Image
                    src={developer.logo || "/placeholder.svg"}
                    alt={developer.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-lg mb-1">{developer.name}</h3>
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{developer.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({developer.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Building className="h-4 w-4 mr-1" />
                  <span>{developer.projectsCount} Projects</span>
                  <span className="mx-1">•</span>
                  <span>Est. {developer.established}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="line-clamp-1">{developer.locations.join(", ")}</span>
                </div>
                <div className="flex flex-wrap justify-center gap-1 mt-2">
                  {developer.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                {developer.featured && (
                  <Badge className="mt-4 bg-primary">
                    <Award className="h-3 w-3 mr-1" />
                    Featured Developer
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
