import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MessageCircle, Award, CheckCircle, Home } from "lucide-react"

interface AgencyAgentsProps {
  agencyId: string
}

// This would typically come from an API based on the agency ID
const getAgencyAgents = (agencyId: string) => {
  console.log(agencyId)
  // Sample data - in a real app, this would be filtered by agency from a database
  const agents = [
    {
      id: "101",
      name: "Sarah Johnson",
      photo: "/placeholder.svg?height=300&width=300",
      title: "Senior Real Estate Consultant",
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
      id: "102",
      name: "Michael Chen",
      photo: "/placeholder.svg?height=300&width=300",
      title: "Commercial Property Specialist",
      rating: 4.8,
      reviewCount: 98,
      specialty: "Office Spaces",
      languages: ["English", "Mandarin", "Cantonese"],
      propertiesCount: {
        sale: 15,
        rent: 24,
      },
      verified: true,
      featured: false,
      experience: 6,
    },
    {
      id: "103",
      name: "Emma Rodriguez",
      photo: "/placeholder.svg?height=300&width=300",
      title: "Residential Sales Manager",
      rating: 4.7,
      reviewCount: 86,
      specialty: "Beachfront Properties",
      languages: ["English", "Spanish"],
      propertiesCount: {
        sale: 22,
        rent: 9,
      },
      verified: true,
      featured: false,
      experience: 5,
    },
    {
      id: "104",
      name: "David Wilson",
      photo: "/placeholder.svg?height=300&width=300",
      title: "Investment Property Advisor",
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
    {
      id: "105",
      name: "Jennifer Parker",
      photo: "/placeholder.svg?height=300&width=300",
      title: "Luxury Home Specialist",
      rating: 4.8,
      reviewCount: 92,
      specialty: "High-End Residences",
      languages: ["English"],
      propertiesCount: {
        sale: 19,
        rent: 5,
      },
      verified: true,
      featured: false,
      experience: 7,
    },
    {
      id: "106",
      name: "Robert Thompson",
      photo: "/placeholder.svg?height=300&width=300",
      title: "New Development Consultant",
      rating: 4.6,
      reviewCount: 78,
      specialty: "Pre-Construction",
      languages: ["English", "German"],
      propertiesCount: {
        sale: 25,
        rent: 3,
      },
      verified: true,
      featured: false,
      experience: 9,
    },
  ]

  return agents
}

export default function AgencyAgents({ agencyId }: AgencyAgentsProps) {
  const agents = getAgencyAgents(agencyId)

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Our Agents</h2>
        <select className="border rounded-md px-3 py-1.5 text-sm bg-white">
          <option>Highest Rated</option>
          <option>Most Experience</option>
          <option>Most Listings</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Link href={`/agents/${agent.id}`} key={agent.id}>
            <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
              <div className="relative h-48">
                <Image src={agent.photo || "/placeholder.svg"} alt={agent.name} fill className="object-cover" />
                {agent.featured && (
                  <Badge className="absolute top-3 left-3 bg-primary">
                    <Award className="h-3 w-3 mr-1" />
                    Top Agent
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-lg flex items-center">
                      {agent.name}
                      {agent.verified && <CheckCircle className="h-4 w-4 ml-1 text-blue-500" />}
                    </h3>
                    <p className="text-sm text-gray-500">{agent.title}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-medium">{agent.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-3">
                  Specializes in {agent.specialty} • {agent.experience} years experience
                </p>

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

      <div className="mt-6 text-center">
        <Button variant="outline">View All Agents</Button>
      </div>
    </div>
  )
}
