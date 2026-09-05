import {
  Dumbbell,
  PocketIcon as Pool,
  Utensils,
  Wifi,
  Car,
  Shield,
  Users,
  Tv,
  Briefcase,
  Trees,
  Leaf,
  Baby,
} from "lucide-react"
import type { JSX } from "react"

interface ProjectAmenitiesProps {
  amenities: string[]
}

// Map amenities to icons
const amenityIcons: Record<string, JSX.Element> = {
  "Swimming Pool": <Pool className="h-5 w-5" />,
  "Fitness Center": <Dumbbell className="h-5 w-5" />,
  "Spa & Sauna": <Utensils className="h-5 w-5" />,
  "Smart Home Technology": <Wifi className="h-5 w-5" />,
  "EV Charging Stations": <Car className="h-5 w-5" />,
  "24/7 Security": <Shield className="h-5 w-5" />,
  "Concierge Service": <Users className="h-5 w-5" />,
  "Private Theater": <Tv className="h-5 w-5" />,
  "Business Center": <Briefcase className="h-5 w-5" />,
  "Rooftop Garden": <Trees className="h-5 w-5" />,
  "Children's Play Area": <Baby className="h-5 w-5" />,
}

export default function ProjectAmenities({ amenities }: ProjectAmenitiesProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-6">Project Amenities</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {amenities.map((amenity) => (
          <div key={amenity} className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
              {amenityIcons[amenity] || <Leaf className="h-5 w-5" />}
            </div>
            <span className="font-medium">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
