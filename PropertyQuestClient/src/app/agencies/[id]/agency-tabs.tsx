"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Award, Building, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import AgencyAgents from "./agency-agents"
import AgencyProperties from "./agency-properties"
import AgencyReviews from "./agency-reviews"

interface AgencyTabsProps {
  agency: {
    id: string
    name: string
    description: string
    specialties: string[]
    certifications: string[]
    established: number
    agentCount: number
    rating: number
    awards: string[]
  }
}

export default function AgencyTabs({ agency }: AgencyTabsProps) {
  return (
    <Tabs defaultValue="about">
      <TabsList className="w-full">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="agents">Agents</TabsTrigger>
        <TabsTrigger value="properties">Properties</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="about" className="mt-6">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-bold mb-4">About {agency.name}</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">{agency.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <Building className="h-5 w-5 mr-2 text-primary" />
                Specialties
              </h3>
              <ul className="space-y-2">
                {agency.specialties.map((specialty) => (
                  <li key={specialty} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {specialty}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Certifications
              </h3>
              <ul className="space-y-2">
                {agency.certifications.map((certification) => (
                  <li key={certification} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {certification}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold">{new Date().getFullYear() - agency.established}</p>
              <p className="text-gray-500 text-sm">Years in Business</p>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold">{agency.agentCount}</p>
              <p className="text-gray-500 text-sm">Expert Agents</p>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold">{agency.rating}</p>
              <p className="text-gray-500 text-sm">Average Rating</p>
            </div>
          </div>

          {agency.awards.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-3 flex items-center">
                <Award className="h-5 w-5 mr-2 text-primary" />
                Awards & Recognition
              </h3>
              <div className="flex flex-wrap gap-2">
                {agency.awards.map((award) => (
                  <Badge key={award} variant="secondary" className="px-3 py-1">
                    {award}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="agents" className="mt-6">
        <AgencyAgents agencyId={agency.id} />
      </TabsContent>

      <TabsContent value="properties" className="mt-6">
        <AgencyProperties agencyId={agency.id} />
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <AgencyReviews agencyId={agency.id} />
      </TabsContent>
    </Tabs>
  )
}
