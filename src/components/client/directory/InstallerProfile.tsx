import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockInstallers } from "@/components/admin/mockData";
import { DatabaseInstallerData } from "@/types/installer";

const InstallerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [installer, setInstaller] = useState<DatabaseInstallerData | null>(null);

  useEffect(() => {
    const fetchInstaller = () => {
      const foundInstaller = mockInstallers.find(installer => installer.id === id);
      setInstaller(foundInstaller || null);
    };

    fetchInstaller();
  }, [id]);

  if (!installer) {
    return <div>Installer not found</div>;
  }

  return (
    <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
      <h2 className="text-2xl font-bold">{installer.company_name}</h2>
      <p className="text-muted-foreground">{installer.description}</p>
      <div className="mt-4">
        <Badge>{installer.city}</Badge>
        <Badge>{installer.postal_code}</Badge>
      </div>
      <div className="mt-4">
        <Button variant="outline" className="mr-2">Contact</Button>
        <Button variant="outline">View Profile</Button>
      </div>
    </Card>
  );
};

export default InstallerProfile;
