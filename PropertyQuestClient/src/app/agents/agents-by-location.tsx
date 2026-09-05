import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface LocationData {
  id: string;
  name: string;
  agentCount: number;
  propertyCount: number;
  popular: boolean;
}

const locations: LocationData[] = [
  {
    id: "downtown",
    name: "Downtown",
    agentCount: 87,
    propertyCount: 342,
    popular: true,
  },
  {
    id: "uptown",
    name: "Uptown",
    agentCount: 64,
    propertyCount: 256,
    popular: true,
  },
  {
    id: "beachfront",
    name: "Beachfront",
    agentCount: 42,
    propertyCount: 178,
    popular: true,
  },
  {
    id: "suburbs",
    name: "Suburbs",
    agentCount: 76,
    propertyCount: 312,
    popular: true,
  },
  {
    id: "midtown",
    name: "Midtown",
    agentCount: 58,
    propertyCount: 224,
    popular: false,
  },
  {
    id: "historic-district",
    name: "Historic District",
    agentCount: 34,
    propertyCount: 145,
    popular: false,
  },
  {
    id: "financial-district",
    name: "Financial District",
    agentCount: 29,
    propertyCount: 118,
    popular: false,
  },
  {
    id: "arts-district",
    name: "Arts District",
    agentCount: 22,
    propertyCount: 96,
    popular: false,
  },
];

export default function AgentsByLocation() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {locations.map((location) => (
        <Link href={`/agents/location/${location.id}`} key={location.id}>
          <Card
            className={`h-full hover:shadow-md transition-shadow ${
              location.popular ? "border-[#16a249]/30 bg-primary/5" : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-lg">{location.name}</h3>
                <MapPin
                  className={`h-5 w-5 ${
                    location.popular ? "text-[#16a249]" : "text-gray-400"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">{location.agentCount}</span>
                  <span className="text-gray-500"> Agents</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium">{location.propertyCount}</span>
                  <span className="text-gray-500"> Properties</span>
                </p>
              </div>

              {location.popular && (
                <div className="mt-4 text-xs font-medium text-primary">
                  Popular Location
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
