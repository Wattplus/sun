import { ProjectsList } from "../dashboard/ProjectsList";
import { Card } from "@/components/ui/card";

export const ProjectsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Mes Projets</h1>
      <ProjectsList />
    </div>
  );
};