import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface Project {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  completionDate: string;
  propertyTypes: string[];
}

const projects: Project[] = [
  {
    id: "1",
    name: "Skyline Towers",
    location: "Downtown, Metro City",
    imageUrl: "/placeholder.svg?height=300&width=500",
    completionDate: "Q4 2025",
    propertyTypes: ["Apartments", "Penthouses"],
  },
  {
    id: "2",
    name: "Riverside Villas",
    location: "Riverside District, Metro City",
    imageUrl: "/placeholder.svg?height=300&width=500",
    completionDate: "Q2 2026",
    propertyTypes: ["Villas", "Townhouses"],
  },
  {
    id: "3",
    name: "Skyline Towers",
    location: "Downtown, Metro City",
    imageUrl: "/5.jpg",
    completionDate: "Q4 2025",
    propertyTypes: ["Apartments", "Penthouses"],
  },
  {
    id: "4",
    name: "Riverside Villas",
    location: "Riverside District, Metro City",
    imageUrl: "/placeholder.svg?height=300&width=500",
    completionDate: "Q2 2026",
    propertyTypes: ["Villas", "Townhouses"],
  },
];

export default function FeaturedProjects() {
  return (
    <section className="py-12 bg-[#ffffff] flex justify-center px-6">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
          <Link
            href="/projects"
            className="text-[#16a249] font-medium hover:underline"
          >
            View all projects
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="relative h-64 w-full">
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                    <div className="flex items-center mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.propertyTypes.map((type) => (
                        <Badge
                          key={type}
                          variant="secondary"
                          className="bg-white/20 hover:bg-white/30"
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">Completion</span>
                      <p className="font-medium">{project.completionDate}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-[#16a249] text-[#16a249]"
                    >
                      New Launch
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
