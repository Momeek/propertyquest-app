import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ProjectsList from "@/components/dashboard/projects-list";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">New Projects</h1>
          <p className="text-gray-500">Manage your development projects</p>
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Project
        </Button>
      </div>

      <ProjectsList />
    </div>
  );
}
