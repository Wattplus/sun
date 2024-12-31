import { DatabaseInstallerData } from "@/types/installer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface InstallerMobileTableProps {
  installers: DatabaseInstallerData[];
  onEditInstaller: (installer: DatabaseInstallerData) => void;
}

export const InstallerMobileTable = ({ installers, onEditInstaller }: InstallerMobileTableProps) => {
  const getStatusBadgeColor = (status: string | null) => {
    switch (status) {
      case "active":
        return "bg-emerald-500";
      case "inactive":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  const getStatusLabel = (status: string | null) => {
    switch (status) {
      case "active":
        return "Actif";
      case "inactive":
        return "Inactif";
      default:
        return "En attente";
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-4 p-4">
        {installers.map((installer) => (
          <Card key={installer.id} className="p-4 bg-background/50 backdrop-blur-sm border-primary/10">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-base">{installer.company_name}</h3>
                  <p className="text-sm text-muted-foreground">{installer.contact_name}</p>
                </div>
                <Badge className={getStatusBadgeColor(installer.status || 'pending')}>
                  {getStatusLabel(installer.status)}
                </Badge>
              </div>

              <div className="space-y-1">
                <p className="text-sm">{installer.email}</p>
                <p className="text-sm">{installer.phone}</p>
                <p className="text-sm">{installer.address}, {installer.postal_code}</p>
              </div>

              <div className="flex flex-wrap gap-1">
                {installer.service_area.map((zone) => (
                  <Badge 
                    key={zone}
                    variant="outline" 
                    className="text-xs border-primary/20 bg-primary/5"
                  >
                    {zone}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {installer.certifications && Object.entries(installer.certifications).map(([cert, value]) => 
                  value && (
                    <Badge 
                      key={cert}
                      className="text-xs bg-primary/20 text-primary"
                    >
                      {cert}
                    </Badge>
                  )
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEditInstaller(installer)}
                  className="flex-1 border-primary/20 hover:border-primary/40 hover:bg-primary/10"
                >
                  <Edit className="h-4 w-4 mr-2 text-primary" />
                  Éditer
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 border-primary/20 hover:border-primary/40 hover:bg-primary/10"
                >
                  <Eye className="h-4 w-4 mr-2 text-primary" />
                  Détails
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};