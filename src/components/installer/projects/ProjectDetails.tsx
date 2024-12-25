import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Euro, FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockProjects, Project } from "../dashboard/ProjectsList";

export const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const project = mockProjects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="p-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <Card className="p-6">
          <p className="text-center text-muted-foreground">Projet non trouvé</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <Badge>{project.status}</Badge>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{project.clientName}</h1>
            <div className="flex items-center text-muted-foreground mt-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{project.location}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Type de projet</h3>
              <p>{project.projectType}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Budget</h3>
              <div className="flex items-center">
                <Euro className="h-4 w-4 mr-1" />
                <span>{project.budget.toLocaleString()}€</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Documents</h3>
            <div className="flex items-center text-muted-foreground">
              <FileText className="h-4 w-4 mr-2" />
              <span>{project.documents} documents associés</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Dernière mise à jour</h3>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{new Date(project.lastUpdate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};