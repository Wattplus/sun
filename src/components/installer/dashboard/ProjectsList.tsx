import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, MapPin, Euro, FileText, Clock, ArrowRight } from "lucide-react";

interface Project {
  id: string;
  clientName: string;
  location: string;
  budget: number;
  projectType: string;
  status: string;
  lastUpdate: string;
  documents: number;
}

const mockProjects: Project[] = [
  {
    id: "1",
    clientName: "Jean D.",
    location: "75001 Paris",
    budget: 15000,
    projectType: "Installation Panneaux Solaires",
    status: "En cours",
    lastUpdate: "2024-03-20",
    documents: 3,
  },
  {
    id: "2",
    clientName: "Marie M.",
    location: "69001 Lyon",
    budget: 12000,
    projectType: "Pompe à chaleur",
    status: "En attente",
    lastUpdate: "2024-03-19",
    documents: 2,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "En cours":
      return "bg-blue-500";
    case "En attente":
      return "bg-yellow-500";
    case "Terminé":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export const ProjectsList = () => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Mes Projets en Cours</h2>
        <Button variant="outline" size="sm">
          Voir tous les projets
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {mockProjects.map((project) => (
            <Card
              key={project.id}
              className="p-4 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{project.clientName}</h3>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{project.location}</span>
                  </div>
                </div>
                <Badge className={`${getStatusColor(project.status)}`}>
                  {project.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type de projet</p>
                  <p className="font-medium">{project.projectType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <div className="flex items-center">
                    <Euro className="h-4 w-4 mr-1" />
                    <span className="font-medium">
                      {project.budget.toLocaleString()}€
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Mis à jour le {new Date(project.lastUpdate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>{project.documents} documents</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Voir les détails
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};