import { Card } from "@/components/ui/card";
import { mockProjects } from "@/types/project";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowRight } from "lucide-react";

export const ProjectsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mes Projets</h1>
        <Button onClick={() => navigate("/espace-installateur/projets/nouveau")} className="gap-2">
          <Plus className="h-4 w-4" />
          Nouveau projet
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockProjects.map((project) => (
          <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{project.clientName}</h3>
                <p className="text-sm text-muted-foreground">{project.location}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{project.projectType}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate(`/espace-installateur/projets/${project.id}`)}
                  className="gap-2"
                >
                  Voir
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};