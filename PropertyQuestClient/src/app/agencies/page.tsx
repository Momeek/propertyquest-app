import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Users, MapPin, Building, ExternalLink, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Real Estate Agencies | HomeQuest",
  description: "Find top-rated real estate agencies to help you buy, sell, or rent your next property",
}

// This would typically come from a database or API
const agencies = [
  {
    id: "1",
    name: "Luxury Homes Realty",
    logo: "/placeholder.svg?height=100&width=100",
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
    logo: "/placeholder.svg?height=100&width=100",
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
    logo: "/placeholder.svg?height=100&width=100",
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
  {
    id: "4",
    name: "Coastal Realty Group",
    logo: "/placeholder.svg?height=100&width=100",
    coverImage: "/placeholder.svg?height=200&width=400",
    rating: 4.6,
    reviewCount: 156,
    agentCount: 28,
    established: 2012,
    locations: ["Beachfront", "Marina", "Coastal Areas"],
    specialties: ["Waterfront", "Vacation Homes", "Luxury"],
    propertiesCount: {
      sale: 76,
      rent: 45,
    },
    verified: true,
  },
  {
    id: "5",
    name: "Urban Living Real Estate",
    logo: "/placeholder.svg?height=100&width=100",
    coverImage: "/placeholder.svg?height=200&width=400",
    rating: 4.5,
    reviewCount: 178,
    agentCount: 32,
    established: 2009,
    locations: ["Downtown", "Arts District", "University Area"],
    specialties: ["Condos", "Lofts", "Urban Properties"],
    propertiesCount: {
      sale: 68,
      rent: 112,
    },
    verified: true,
  },
  {
    id: "6",
    name: "Family First Properties",
    logo: "/placeholder.svg?height=100&width=100",
    coverImage: "/placeholder.svg?height=200&width=400",
    rating: 4.8,
    reviewCount: 210,
    agentCount: 25,
    established: 2011,
    locations: ["Suburbs", "School Districts", "Family Neighborhoods"],
    specialties: ["Single-Family Homes", "First-Time Buyers", "Relocation"],
    propertiesCount: {
      sale: 105,
      rent: 42,
    },
    verified: true,
  },
]

export default function AgenciesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/90 to-primary/70 text-white">
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
        <div className="relative container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Top Real Estate Agencies</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Connect with established agencies that will help you navigate the real estate market with confidence
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input type="text" placeholder="Search by agency name or location" className="pl-10 bg-gray-50" />
              </div>
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Real Estate Agencies</h2>
            <p className="text-gray-500 mt-1">Find the perfect partner for your real estate journey</p>
          </div>
          <select className="border rounded-md px-3 py-1.5 text-sm bg-white">
            <option>Highest Rated</option>
            <option>Most Agents</option>
            <option>Most Properties</option>
            <option>Established Date</option>
          </select>
        </div>

        {/* Agencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agencies.map((agency) => (
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

                  <Button variant="outline" className="w-full mt-4 gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Agency
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg">
            Load More Agencies
          </Button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/10 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Are You a Real Estate Agency?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Join our platform to showcase your properties and connect with potential clients
            </p>
            <Button size="lg">Register Your Agency</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
