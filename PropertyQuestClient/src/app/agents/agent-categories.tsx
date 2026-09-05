import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  Building,
  Landmark,
  Castle,
  Globe,
  TrendingUp,
  Hotel,
  Warehouse,
} from "lucide-react";

const categories = [
  {
    id: "residential",
    name: "Residential",
    icon: <Home className="h-8 w-8" />,
    description: "Single-family homes, condos, and apartments",
    count: 245,
  },
  {
    id: "commercial",
    name: "Commercial",
    icon: <Building className="h-8 w-8" />,
    description: "Office spaces, retail, and mixed-use properties",
    count: 128,
  },
  {
    id: "luxury",
    name: "Luxury",
    icon: <Castle className="h-8 w-8" />,
    description: "High-end properties and exclusive listings",
    count: 86,
  },
  {
    id: "investment",
    name: "Investment",
    icon: <TrendingUp className="h-8 w-8" />,
    description: "Income properties and development opportunities",
    count: 112,
  },
  {
    id: "international",
    name: "International",
    icon: <Globe className="h-8 w-8" />,
    description: "Properties across borders and overseas",
    count: 74,
  },
  {
    id: "new-developments",
    name: "New Developments",
    icon: <Landmark className="h-8 w-8" />,
    description: "Pre-construction and newly built properties",
    count: 93,
  },
  {
    id: "vacation",
    name: "Vacation",
    icon: <Hotel className="h-8 w-8" />,
    description: "Holiday homes and rental properties",
    count: 67,
  },
  {
    id: "industrial",
    name: "Industrial",
    icon: <Warehouse className="h-8 w-8" />,
    description: "Warehouses, manufacturing, and logistics",
    count: 51,
  },
];

export default function AgentCategories() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link href={`/agents/category/${category.id}`} key={category.id}>
          <Card className="h-full hover:shadow-md transition-shadow hover:border-[#16a249]/50">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-[#16a249]/10 text-[#16a249] mb-4">
                {category.icon}
              </div>
              <h3 className="font-bold text-lg mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {category.description}
              </p>
              <p className="text-sm font-medium">{category.count} Agents</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
