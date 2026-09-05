import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, MapPin, DollarSign, ArrowRight, BarChart2 } from "lucide-react"

interface Hotspot {
  id: string
  name: string
  location: string
  image: string
  priceGrowth: number
  avgPrice: number
  rentalYield: number
  investmentScore: number
  description: string
  tags: string[]
}

const hotspots: Hotspot[] = [
  {
    id: "emerging-district",
    name: "Emerging District",
    location: "North Metro Area",
    image: "/placeholder.svg?height=200&width=300",
    priceGrowth: 12.5,
    avgPrice: 320000,
    rentalYield: 5.8,
    investmentScore: 8.7,
    description:
      "This up-and-coming neighborhood is experiencing rapid development with new infrastructure projects and commercial spaces. Early investors are seeing strong appreciation and rental demand.",
    tags: ["Up-and-Coming", "High Growth", "New Development"],
  },
  {
    id: "university-area",
    name: "University Area",
    location: "East Metro Area",
    image: "/placeholder.svg?height=200&width=300",
    priceGrowth: 9.2,
    avgPrice: 280000,
    rentalYield: 6.5,
    investmentScore: 8.4,
    description:
      "Properties near the expanding university campus offer excellent rental potential with steady demand from students and faculty. Recent campus expansion is driving additional growth.",
    tags: ["Strong Rental", "Student Housing", "Steady Demand"],
  },
  {
    id: "tech-corridor",
    name: "Tech Corridor",
    location: "West Metro Area",
    image: "/placeholder.svg?height=200&width=300",
    priceGrowth: 15.3,
    avgPrice: 450000,
    rentalYield: 5.2,
    investmentScore: 9.1,
    description:
      "The growing technology hub is attracting high-income professionals and creating strong demand for quality housing. New office developments continue to drive population growth.",
    tags: ["High Growth", "Tech Hub", "Professional Tenants"],
  },
  {
    id: "waterfront-district",
    name: "Waterfront District",
    location: "South Metro Area",
    image: "/placeholder.svg?height=200&width=300",
    priceGrowth: 11.8,
    avgPrice: 520000,
    rentalYield: 4.9,
    investmentScore: 8.2,
    description:
      "Ongoing waterfront revitalization projects are transforming this area into a premium residential and commercial district. Luxury properties with water views command premium prices and rents.",
    tags: ["Luxury Market", "Waterfront", "Urban Renewal"],
  },
]

export default function InvestmentHotspots() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {hotspots.map((hotspot) => (
        <Card key={hotspot.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48">
            <Image src={hotspot.image || "/placeholder.svg"} alt={hotspot.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-xl font-bold">{hotspot.name}</h3>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{hotspot.location}</span>
              </div>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {hotspot.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <p className="text-gray-700 mb-4 line-clamp-3">{hotspot.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Price Growth
                </div>
                <p className="font-medium text-green-600">+{hotspot.priceGrowth}%</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Avg. Price
                </div>
                <p className="font-medium">${hotspot.avgPrice.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <BarChart2 className="h-4 w-4 mr-1" />
                  Rental Yield
                </div>
                <p className="font-medium">{hotspot.rentalYield}%</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <BarChart2 className="h-4 w-4 mr-1" />
                  Investment Score
                </div>
                <p className="font-medium">{hotspot.investmentScore}/10</p>
              </div>
            </div>

            <Link href={`/insights/hotspots/${hotspot.id}`}>
              <Button variant="outline" className="w-full">
                View Investment Analysis
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
