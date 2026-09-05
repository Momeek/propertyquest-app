import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MessageCircle, Award, CheckCircle, Home, Building } from "lucide-react"

interface CategoryAgentListProps {
  category: string
}

// This would typically come from an API based on the category
const getCategoryAgents = (category: string) => {
  // Sample data - in a real app, this would be filtered by category from a database
  console.log(category)
  const agents = [
    {
      id: "101",
      name: "Jennifer Parker",
      photo: "/placeholder.svg?height=300&width=300",
      agency: "Residential Experts",
      agencyLogo: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      reviewCount: 156,
      specialty: "Single-Family Homes",
      languages: ["English", "Spanish"],
      propertiesCount: {
        sale: 32,
        rent: 8,
      },
      verified: true,
      featured: true,
      experience: 12,
    },
    {
      id: "102",
      name: "Robert Thompson",
      photo: "/placeholder.svg?height=300&width=300",
      agency: "Urban Living Realty",
      agencyLogo: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      reviewCount: 112,
      specialty: "Condos & Apartments",
      languages: ["English", "French"],
      propertiesCount: {
        sale: 24,
        rent: 18,
      },
      verified: true,
      featured: false,
      experience: 8,
    },
    {
      id: "103",
      name: "Maria Gonzalez",
      photo: "/placeholder.svg?height=300&width=300",
      agency: "Family First Properties",
      agencyLogo: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      reviewCount: 94,
      specialty: "First-Time Buyers",
      languages: ["English", "Spanish"],
      propertiesCount: {
        sale: 19,
        rent: 5,
      },
      verified: true,
      featured: false,
      experience: 6,
    },
    {
      id: "104",
      name: "David Kim",
      photo: "/placeholder.svg?height=300&width=300",
      agency: "Luxury Homes Realty",
      agencyLogo: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      reviewCount: 128,
      specialty: "Luxury Homes",
      languages: ["English", "Korean", "Mandarin"],
      propertiesCount: {
        sale: 28,
        rent: 3,
      },
      verified: true,
      featured: true,
      experience: 10,
    },
    {
      id: "105",
      name: "Sophia Williams",
      photo: "/placeholder.svg?height=300&width=300",
      agency: "Townhouse Specialists",
      agencyLogo: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
      reviewCount: 87,
      specialty: "Townhouses",
      languages: ["English"],
      propertiesCount: {
        sale: 22,
        rent: 14,
      },
      verified: true,
      featured: false,
      experience: 7,
    },
    {
      id: "106",
      name: "James Wilson",
      photo: "/placeholder.svg?height=300&width=300",
      agency: "Suburban Homes",
      agencyLogo: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      reviewCount: 103,
      specialty: "Single-Family Homes",
      languages: ["English"],
      propertiesCount: {
        sale: 31,
        rent: 6,
      },
      verified: true,
      featured: false,
      experience: 9,
    },
  ]

  return agents
}

export default function CategoryAgentList({ category }: CategoryAgentListProps) {
  const agents = getCategoryAgents(category)

  return (
    <div>
      {/* Sort Options */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-500">Showing {agents.length} of 245 agents</p>
        <select className="border rounded-md px-3 py-1.5 text-sm bg-white">
          <option>Highest Rated</option>
          <option>Most Experience</option>
          <option>Most Listings</option>
          <option>Recently Active</option>
        </select>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Link href={`/agents/${agent.id}`} key={agent.id}>
            <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative">
                <div className="relative h-48 w-full">
                  <Image src={agent.photo || "/placeholder.svg"} alt={agent.name} fill className="object-cover" />
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
                    <span className="mx-1 text-xs">({agent.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-lg flex items-center">
                      {agent.name}
                      {agent.verified && <CheckCircle className="h-4 w-4 ml-1 text-blue-500" />}
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

                <Button variant="outline" className="w-full mt-4 gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Contact Agent
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
