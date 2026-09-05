"use client"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import CategoryAgentList from "./category-agent-list"
import CategoryFilters from "./category-filters"

// Define the categories we support
const validCategories = [
  {
    id: "residential",
    name: "Residential",
    description: "Agents specializing in single-family homes, condos, and apartments",
    agentCount: 245,
  },
  {
    id: "commercial",
    name: "Commercial",
    description: "Agents specializing in office spaces, retail, and mixed-use properties",
    agentCount: 128,
  },
  {
    id: "luxury",
    name: "Luxury",
    description: "Agents specializing in high-end properties and exclusive listings",
    agentCount: 86,
  },
  {
    id: "investment",
    name: "Investment",
    description: "Agents specializing in income properties and development opportunities",
    agentCount: 112,
  },
  {
    id: "international",
    name: "International",
    description: "Agents specializing in properties across borders and overseas",
    agentCount: 74,
  },
  {
    id: "new-developments",
    name: "New Developments",
    description: "Agents specializing in pre-construction and newly built properties",
    agentCount: 93,
  },
  {
    id: "vacation",
    name: "Vacation",
    description: "Agents specializing in holiday homes and rental properties",
    agentCount: 67,
  },
  {
    id: "industrial",
    name: "Industrial",
    description: "Agents specializing in warehouses, manufacturing, and logistics",
    agentCount: 51,
  },
]

export default function CategoryPage() {
  const { category } = useParams();

  // Find the category from our valid categories
  const foundCategory = validCategories.find((c) => c.id === category)

  // If category doesn't exist, return 404
  if (!foundCategory) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container py-8 px-8">
          <Link href="/agents" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all agent categories
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">{foundCategory.name} Real Estate Agents</h1>
          <p className="text-gray-500 text-lg">{foundCategory.description}</p>
          <p className="text-gray-500 mt-2">Showing {foundCategory.agentCount} agents</p>
        </div>
      </div>

      <div className="container py-8 flex flex-col mx-auto justify-center px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <CategoryFilters category={foundCategory?.id} />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <CategoryAgentList category={foundCategory?.id} />

            {/* Load More Button */}
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Load More Agents
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
