import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";

interface ProjectStatusProps {
  status: string;
  lastUpdate: string;
}

export const ProjectStatus = ({ status, lastUpdate }: ProjectStatusProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">État du projet</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Statut actuel</p>
          <p className="font-medium">{status}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Dernière mise à jour</p>
          <p className="font-medium">{lastUpdate}</p>
        </div>
        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4 text-green-500" />
            <span>Vos coordonnées sont protégées</span>
          </div>
        </div>
      </div>
    </Card>
  );
};