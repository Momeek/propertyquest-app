"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  MapPin,
  Calendar,
  Eye,
  MoreHorizontal,
  Edit,
  Trash2,
  PlusCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Project {
  id: string;
  name: string;
  location: string;
  completionDate: string;
  status: "Off-Plan" | "Under Construction" | "Ready" | "Completed";
  propertyTypes: string[];
  image: string;
}

const projects: Project[] = [
  {
    id: "proj-1",
    name: "Skyline Towers",
    location: "Downtown, Metro City",
    completionDate: "Q4 2025",
    status: "Off-Plan",
    propertyTypes: ["Apartments", "Penthouses"],
    image: "/5.jpg",
  },
  {
    id: "proj-2",
    name: "Marina Heights",
    location: "Marina District, Metro City",
    completionDate: "Q2 2024",
    status: "Under Construction",
    propertyTypes: ["Apartments", "Penthouses", "Retail"],
    image: "/3.jpg",
  },
  {
    id: "proj-3",
    name: "Garden Villas",
    location: "Suburban District, Metro City",
    completionDate: "Q1 2024",
    status: "Under Construction",
    propertyTypes: ["Villas", "Townhouses"],
    image: "/1.jpg",
  },
];

export default function ProjectsList() {
  const [projectsList, setProjectsList] = useState(projects);

  const deleteProject = (id: string) => {
    setProjectsList(projectsList.filter((project) => project.id !== id));
  };

  if (projectsList.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-8 text-center">
        <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No Projects Yet</h3>
        <p className="text-gray-500 mb-6">
          Add your first development project to showcase to potential buyers.
        </p>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Project
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projectsList.map((project) => (
        <Card
          key={project.id}
          className="overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="relative h-48">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute top-3 left-3">
              <Badge
                className={
                  project.status === "Off-Plan"
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                    : project.status === "Under Construction"
                    ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                    : "bg-green-100 text-green-800 hover:bg-green-100"
                }
              >
                {project.status}
              </Badge>
            </div>
            <div className="absolute top-3 right-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 hover:bg-white"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-white shadow-md border-[#b6b3b3]"
                  align="end"
                >
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/projects/${project.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => deleteProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-xl font-bold mb-1">{project.name}</h3>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{project.location}</span>
              </div>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.propertyTypes.map((type) => (
                <Badge key={type} variant="outline">
                  {type}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                <span>Completion: {project.completionDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
