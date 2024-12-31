import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Card } from "@/components/ui/card";
import { DatabaseInstallerData } from "@/types/installer";
import { InstallerTable } from "./installer/InstallerTable";
import { InstallerMobileTable } from "./installer/InstallerMobileTable";
import { InstallerHeader } from "./installer/InstallerHeader";
import { EditInstallerDialog } from "./EditInstallerDialog";
import { transformDatabaseToInstaller, transformInstallerToDatabase } from "@/utils/installerTransform";
import { Installer } from "@/types/crm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export const InstallerManagement = () => {
  const [installers, setInstallers] = useState<DatabaseInstallerData[]>([]);
  const [selectedInstaller, setSelectedInstaller] = useState<Installer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedInstallers, setSelectedInstallers] = useState<string[]>([]);
  
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    fetchInstallers();
  }, []);

  const fetchInstallers = async () => {
    try {
      const { data, error } = await supabase
        .from('installers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setInstallers(data as DatabaseInstallerData[]);
    } catch (error) {
      console.error('Error fetching installers:', error);
      toast.error("Erreur lors du chargement des installateurs");
    } finally {
      setLoading(false);
    }
  };

  const handleEditInstaller = (dbInstaller: DatabaseInstallerData) => {
    setSelectedInstaller(transformDatabaseToInstaller(dbInstaller));
    setDialogOpen(true);
  };

  const handleNewInstaller = () => {
    setSelectedInstaller(null);
    setDialogOpen(true);
  };

  const handleSaveInstaller = async (installer: Installer) => {
    try {
      const dbInstaller = transformInstallerToDatabase(installer);
      
      const { error } = await supabase
        .from('installers')
        .upsert({ 
          ...dbInstaller,
          user_id: installer.id,
          verified: true,
          status: "active"
        })
        .select()
        .single();

      if (error) throw error;

      toast.success(installer.id ? "Installateur modifié avec succès" : "Nouvel installateur créé avec succès");
      setDialogOpen(false);
      fetchInstallers();
    } catch (error) {
      console.error('Error saving installer:', error);
      toast.error("Erreur lors de l'enregistrement de l'installateur");
    }
  };

  const handleSelectInstaller = (installerId: string, checked: boolean) => {
    setSelectedInstallers(prev => {
      if (checked) {
        return [...prev, installerId];
      }
      return prev.filter(id => id !== installerId);
    });
  };

  const handleDeleteSelected = async () => {
    try {
      const { error } = await supabase
        .from('installers')
        .delete()
        .in('id', selectedInstallers);

      if (error) throw error;

      toast.success(`${selectedInstallers.length} installateur(s) supprimé(s) avec succès`);
      setSelectedInstallers([]);
      fetchInstallers();
    } catch (error) {
      console.error('Error deleting installers:', error);
      toast.error("Erreur lors de la suppression des installateurs");
    }
  };

  const filteredInstallers = installers.filter(installer =>
    installer.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    installer.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    installer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background/95 to-background/50 py-4 sm:py-8">
        <div className="max-w-[1600px] mx-auto px-4">
          <p className="text-center text-muted-foreground">Chargement des installateurs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/95 to-background/50 py-4 sm:py-8">
      <div className="max-w-[1600px] mx-auto px-4 space-y-6">
        <InstallerHeader 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onNewInstaller={handleNewInstaller}
          selectedCount={selectedInstallers.length}
          onDeleteSelected={() => {
            if (selectedInstallers.length > 0) {
              handleDeleteSelected();
            }
          }}
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
              onEditInstaller={(installer) => {
                const dbInstaller = installers.find(i => i.id === installer.id);
                if (dbInstaller) {
                  handleEditInstaller(dbInstaller);
                }
              }}
              selectedInstallers={selectedInstallers}
              onSelectInstaller={handleSelectInstaller}
              onDeleteSelected={handleDeleteSelected}
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