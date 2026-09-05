import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building,
  Home,
  Castle,
  Landmark,
  Trees,
  Building2,
  Hotel,
  Warehouse,
} from "lucide-react";

const categories = [
  {
    id: "residential",
    name: "Residential",
    icon: <Home className="h-8 w-8" />,
    description: "Apartments, villas, and townhouses",
    count: 145,
  },
  {
    id: "luxury",
    name: "Luxury",
    icon: <Castle className="h-8 w-8" />,
    description: "High-end properties and exclusive developments",
    count: 68,
  },
  {
    id: "waterfront",
    name: "Waterfront",
    icon: <Landmark className="h-8 w-8" />,
    description: "Properties with water views and access",
    count: 52,
  },
  {
    id: "eco-friendly",
    name: "Eco-Friendly",
    icon: <Trees className="h-8 w-8" />,
    description: "Sustainable and green developments",
    count: 37,
  },
  {
    id: "mixed-use",
    name: "Mixed-Use",
    icon: <Building2 className="h-8 w-8" />,
    description: "Combined residential and commercial spaces",
    count: 43,
  },
  {
    id: "hospitality",
    name: "Hospitality",
    icon: <Hotel className="h-8 w-8" />,
    description: "Hotels and serviced apartments",
    count: 29,
  },
  {
    id: "commercial",
    name: "Commercial",
    icon: <Building className="h-8 w-8" />,
    description: "Office spaces and retail developments",
    count: 56,
  },
  {
    id: "industrial",
    name: "Industrial",
    icon: <Warehouse className="h-8 w-8" />,
    description: "Warehouses and manufacturing facilities",
    count: 18,
  },
];

export default function ProjectCategories() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link href={`/projects/category/${category.id}`} key={category.id}>
          <Card className="h-full hover:shadow-md transition-shadow hover:border-[#16a249]/50">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-[#16a249]/10 text-[#16a249] mb-4">
                {category.icon}
              </div>
              <h3 className="font-bold text-lg mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {category.description}
              </p>
              <p className="text-sm font-medium">{category.count} Projects</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
