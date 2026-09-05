"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Calendar, TrendingUp } from "lucide-react"

export default function MarketSearch() {
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [timeframe, setTimeframe] = useState("")

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Location"
            className="pl-10"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Property Type" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="industrial">Industrial</SelectItem>
            <SelectItem value="land">Land</SelectItem>
            <SelectItem value="all">All Types</SelectItem>
          </SelectContent>
        </Select>

        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Timeframe" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
            <SelectItem value="5years">Last 5 Years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4">
        <Button className="w-full md:w-auto">
          <Search className="h-4 w-4 mr-2" />
          Analyze Market
        </Button>
      </div>
    </div>
  )
}
