import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export interface Project {
  id: string;
  name: string;
  status: string;
  assignedTo: string;
  deadline: string;
  clientName: string;
  location: string;
  projectType: string;
  budget: number;
  documents: number;
  lastUpdate: string;
}

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Projet Solaire A",
    status: "En cours",
    assignedTo: "Électricité Plus",
    deadline: "2023-12-01",
    clientName: "Jean Dupont",
    location: "Paris",
    projectType: "Installation Panneaux Solaires",
    budget: 15000,
    documents: 3,
    lastUpdate: "2024-01-15"
  },
  {
    id: "2",
    name: "Projet Solaire B",
    status: "Terminé",
    assignedTo: "Solar Pro",
    deadline: "2023-11-15",
    clientName: "Marie Martin",
    location: "Lyon",
    projectType: "Pompe à chaleur",
    budget: 12000,
    documents: 2,
    lastUpdate: "2024-01-10"
  },
  {
    id: "3",
    name: "Projet Solaire C",
    status: "À venir",
    assignedTo: "Éco-Énergie Solutions",
    deadline: "2024-01-10",
    clientName: "Pierre Durand",
    location: "Marseille",
    projectType: "Installation Panneaux Solaires",
    budget: 18000,
    documents: 1,
    lastUpdate: "2024-01-20"
  },
];

export const ProjectsList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewDetails = (projectId: string) => {
    navigate(`/espace-installateur/projets/${projectId}`);
    toast({
      title: "Navigation",
      description: "Affichage des détails du projet",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Liste des Projets</h2>
      <div className="space-y-4">
        {mockProjects.map((project) => (
          <Card key={project.id} className="p-4 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Client: {project.clientName} | Statut: {project.status}
                </p>
                <p className="text-sm text-muted-foreground">
                  Échéance: {project.deadline}
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => handleViewDetails(project.id)}
              >
                Voir les détails
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default ProjectsList;