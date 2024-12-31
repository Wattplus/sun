import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Card } from "@/components/ui/card";
import { mockInstallers } from "./mockData";
import { DatabaseInstallerData } from "@/types/installer";
import { InstallerTable } from "./installer/InstallerTable";
import { InstallerMobileTable } from "./installer/InstallerMobileTable";
import { InstallerHeader } from "./installer/InstallerHeader";
import { EditInstallerDialog } from "./EditInstallerDialog";
import { transformDatabaseToInstaller, transformInstallerToDatabase } from "@/utils/installerTransform";
import { Installer } from "@/types/crm";

export const InstallerManagement = () => {
  const [installers, setInstallers] = useState<DatabaseInstallerData[]>(mockInstallers);
  const [selectedInstaller, setSelectedInstaller] = useState<Installer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    // Fetch installers from the database or API
    const fetchInstallers = async () => {
      // Simulate fetching data
      const fetchedInstallers = await new Promise<DatabaseInstallerData[]>((resolve) => {
        setTimeout(() => {
          resolve(mockInstallers);
        }, 1000);
      });
      setInstallers(fetchedInstallers);
    };

    fetchInstallers();
  }, []);

  const handleEditInstaller = (dbInstaller: DatabaseInstallerData) => {
    setSelectedInstaller(transformDatabaseToInstaller(dbInstaller));
    setDialogOpen(true);
  };

  const handleNewInstaller = () => {
    setSelectedInstaller(null);
    setDialogOpen(true);
  };

  const handleSaveInstaller = (installer: Installer) => {
    const dbInstaller = transformInstallerToDatabase(installer);
    if (selectedInstaller) {
      setInstallers(installers.map(i => i.id === installer.id ? { ...dbInstaller, id: installer.id } as DatabaseInstallerData : i));
    } else {
      setInstallers([...installers, { ...dbInstaller, id: crypto.randomUUID() } as DatabaseInstallerData]);
    }
  };

  const filteredInstallers = installers.filter(installer =>
    installer.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    installer.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    installer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/95 to-background/50 py-4 sm:py-8">
      <div className="max-w-[1600px] mx-auto px-4 space-y-6">
        <InstallerHeader 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onNewInstaller={handleNewInstaller}
        />
        
        {isMobile ? (
          <InstallerMobileTable 
            installers={filteredInstallers}
            onEditInstaller={handleEditInstaller}
          />
        ) : (
          <Card className="overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm">
            <InstallerTable 
              installers={filteredInstallers.map(transformDatabaseToInstaller)}
              onEditInstaller={(installer) => handleEditInstaller(installers.find(i => i.id === installer.id)!)}
            />
          </Card>
        )}

        <EditInstallerDialog
          installer={selectedInstaller}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSave={handleSaveInstaller}
        />
      </div>
    </div>
  );
};

export default InstallerManagement;