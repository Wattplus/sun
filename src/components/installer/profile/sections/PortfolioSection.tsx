import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Image, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface PortfolioSectionProps {
  data: any;
}

export const PortfolioSection = ({ data }: PortfolioSectionProps) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: null as File | null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewProject(prev => ({
        ...prev,
        image: e.target.files![0]
      }));
    }
  };

  const handleAddProject = async () => {
    try {
      // TODO: Implement file upload and project creation
      toast.success("Projet ajouté avec succès");
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Erreur lors de l'ajout du projet");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Ajouter un nouveau projet</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Titre du projet</Label>
            <Input
              id="title"
              value={newProject.title}
              onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Nom du projet"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newProject.description}
              onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Description du projet"
            />
          </div>

          <div>
            <Label htmlFor="image">Photo</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
          </div>

          <Button onClick={handleAddProject} className="w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter le projet
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="overflow-hidden">
            {project.image && (
              <div className="aspect-video relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="p-4">
              <h4 className="font-semibold">{project.title}</h4>
              <p className="text-sm text-muted-foreground mt-2">
                {project.description}
              </p>
              <Button
                variant="destructive"
                size="sm"
                className="mt-4"
                onClick={() => {
                  // Handle project deletion
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};