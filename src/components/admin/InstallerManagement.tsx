import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Installer, InstallerStatus } from "@/types/crm";
import { Search, Download, Plus, Edit, Eye } from "lucide-react";
import { EditInstallerDialog } from "./EditInstallerDialog";
import { useToast } from "@/components/ui/use-toast";
import { InstallerTable } from "./installer/InstallerTable";
import { InstallerHeader } from "./installer/InstallerHeader";
import { AdminBreadcrumb } from "./AdminBreadcrumb";

export const mockInstallers: Installer[] = [
  {
    id: "1",
    companyName: "Électricité Plus",
    contactName: "Pierre Durant",
    email: "contact@electriciteplus.fr",
    phone: "01 23 45 67 89",
    address: "789 Boulevard Haussmann, 75008 Paris",
    zones: ["75", "92", "93", "94"],
    status: "active",
    commission: 10,
    leadsAssigned: 45,
    conversionRate: 68,
    paymentType: "per_lead"
  },
  {
    id: "2",
    companyName: "Solar Pro",
    contactName: "Sophie Martin",
    email: "info@solarpro.fr",
    phone: "04 56 78 90 12",
    address: "456 Rue de la République, 69001 Lyon",
    zones: ["69", "38", "01"],
    status: "active",
    commission: 12,
    leadsAssigned: 32,
    conversionRate: 72,
    paymentType: "prepaid"
  }
];

const InstallerManagement = () => {
  const [installers, setInstallers] = useState<Installer[]>(mockInstallers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInstaller, setSelectedInstaller] = useState<Installer | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleEditClose = () => {
    setSelectedInstaller(null);
    setEditDialogOpen(false);
  };

  const handleNewInstaller = () => {
    const newInstaller: Installer = {
      id: String(Date.now()),
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      address: "",
      zones: [],
      status: "pending",
      commission: 0,
      leadsAssigned: 0,
      conversionRate: 0,
      paymentType: "per_lead"
    };
    setSelectedInstaller(newInstaller);
    setEditDialogOpen(true);
  };

  const handleSaveInstaller = (updatedInstaller: Installer) => {
    if (installers.find(i => i.id === updatedInstaller.id)) {
      setInstallers(installers.map(installer => 
        installer.id === updatedInstaller.id ? updatedInstaller : installer
      ));
    } else {
      setInstallers([...installers, updatedInstaller]);
    }
    toast({
      title: "Installateur mis à jour",
      description: "Les modifications ont été enregistrées avec succès.",
    });
    handleEditClose();
  };

  return (
    <div className="space-y-6">
      <AdminBreadcrumb />
      <div className="bg-background/50 backdrop-blur-md p-6 rounded-xl border border-primary/20">
        <InstallerHeader 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onNewInstaller={handleNewInstaller}
        />

        <InstallerTable 
          installers={installers}
          onEditInstaller={(installer) => {
            setSelectedInstaller(installer);
            setEditDialogOpen(true);
          }}
        />

        <EditInstallerDialog
          installer={selectedInstaller}
          open={editDialogOpen}
          onOpenChange={handleEditClose}
          onSave={handleSaveInstaller}
        />
      </div>
    </div>
  );
};

export default InstallerManagement;
