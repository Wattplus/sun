import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockInstallers } from "@/components/admin/mockData";
import { DatabaseInstallerData } from "@/types/installer";
import { MapPin, Phone, Mail, Globe, Award, CheckCircle } from "lucide-react";

const InstallerDirectory = () => {
  const [installers, setInstallers] = useState<DatabaseInstallerData[]>([]);

  useEffect(() => {
    // Simulate fetching installers from an API or database
    setInstallers(mockInstallers);
  }, []);

  return (
    <ScrollArea className="h-full">
      <div className="grid grid-cols-1 gap-4 p-4">
        {installers.map((installer) => (
          <Card key={installer.id} className="p-4 bg-background/50 backdrop-blur-md border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{installer.company_name}</h3>
                <p className="text-sm text-muted-foreground">{installer.contact_name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge>{installer.city}</Badge>
                  <Badge>{installer.postal_code}</Badge>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <Button variant="outline" className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {installer.phone}
                </Button>
                <Button variant="outline" className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {installer.email}
                </Button>
                <Button variant="outline" className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  {installer.website}
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-medium">Certifications:</h4>
              <div className="flex gap-2">
                {installer.certifications.qualiPV && <Badge>QualiPV</Badge>}
                {installer.certifications.rge && <Badge>RGE</Badge>}
                {installer.certifications.qualibat && <Badge>Qualibat</Badge>}
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-medium">Services d'installation:</h4>
              <div className="flex gap-2">
                {installer.installation_types.residential && <Badge>Résidentiel</Badge>}
                {installer.installation_types.commercial && <Badge>Commercial</Badge>}
                {installer.installation_types.industrial && <Badge>Industriel</Badge>}
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-medium">Zone de service:</h4>
              <p>{installer.service_area.join(", ")}</p>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default InstallerDirectory;
