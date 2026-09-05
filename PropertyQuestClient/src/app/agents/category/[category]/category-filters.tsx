"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, X, Star } from "lucide-react"

interface CategoryFiltersProps {
  category: string
}

export default function CategoryFilters({ category }: CategoryFiltersProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  // Get category-specific filters
  const getSpecializations = () => {
    switch (category) {
      case "residential":
        return ["Single-Family Homes", "Condos", "Apartments", "Townhouses", "First-Time Buyers", "Luxury Homes"]
      case "commercial":
        return ["Office", "Retail", "Industrial", "Mixed-Use", "Land", "Hospitality"]
      case "luxury":
        return ["Waterfront", "Penthouses", "Estates", "Historic", "Golf Properties", "Equestrian"]
      default:
        return ["General", "Specialized", "Certified"]
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg border space-y-6">
      {/* Search Input */}
      <div className="space-y-2">
        <Label>Agent Name</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input className="pl-9" placeholder="Search agents..." />
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="px-3 py-1">
              {filter}
              <button onClick={() => removeFilter(filter)} className="ml-2 hover:text-primary">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Filter Accordion */}
      <Accordion type="multiple" defaultValue={["rating", "experience", "specialization"]} className="w-full">
        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[5, 4, 3].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} onCheckedChange={() => addFilter(`${rating}+ Stars`)} />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    {rating}+ <Star className="h-3 w-3 ml-1 text-yellow-400 fill-yellow-400" />
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger>Experience</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["10+ years", "5-10 years", "2-5 years", "Less than 2 years"].map((exp) => (
                <div key={exp} className="flex items-center space-x-2">
                  <Checkbox id={`exp-${exp}`} onCheckedChange={() => addFilter(exp)} />
                  <label
                    htmlFor={`exp-${exp}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {exp}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="specialization">
          <AccordionTrigger>Specialization</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {getSpecializations().map((spec) => (
                <div key={spec} className="flex items-center space-x-2">
                  <Checkbox id={`spec-${spec}`} onCheckedChange={() => addFilter(spec)} />
                  <label
                    htmlFor={`spec-${spec}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {spec}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="languages">
          <AccordionTrigger>Languages</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["English", "Spanish", "French", "Mandarin", "Arabic", "Hindi"].map((lang) => (
                <div key={lang} className="flex items-center space-x-2">
                  <Checkbox id={`lang-${lang}`} onCheckedChange={() => addFilter(lang)} />
                  <label
                    htmlFor={`lang-${lang}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {lang}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location">
          <AccordionTrigger>Location</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Downtown", "Uptown", "Suburbs", "Beachfront", "Midtown"].map((loc) => (
                <div key={loc} className="flex items-center space-x-2">
                  <Checkbox id={`loc-${loc}`} onCheckedChange={() => addFilter(loc)} />
                  <label
                    htmlFor={`loc-${loc}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {loc}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}
