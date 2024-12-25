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

  const getStatusColor = (status: InstallerStatus) => {
    const colors = {
      active: "bg-green-500",
      inactive: "bg-gray-500",
      pending: "bg-yellow-500"
    };
    return colors[status];
  };

  const getStatusText = (status: InstallerStatus) => {
    const texts = {
      active: "Actif",
      inactive: "Inactif",
      pending: "En attente"
    };
    return texts[status];
  };

  const handleEditClick = (installer: Installer) => {
    setSelectedInstaller(installer);
    setEditDialogOpen(true);
  };

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

  const exportToCSV = () => {
    console.log("Exporting to CSV...");
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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Gestion des Installateurs</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            Exporter CSV
          </Button>
          <Button onClick={handleNewInstaller}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvel Installateur
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[600px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Société</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Zone</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Leads Assignés</TableHead>
              <TableHead>Taux de Conversion</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {installers.map((installer) => (
              <TableRow key={installer.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{installer.companyName}</TableCell>
                <TableCell>
                  <div>{installer.contactName}</div>
                  <div className="text-sm text-gray-500">{installer.email}</div>
                  <div className="text-sm text-gray-500">{installer.phone}</div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {installer.zones.map((zone) => (
                      <Badge key={zone} variant="outline">
                        {zone}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{installer.commission}%</TableCell>
                <TableCell>{installer.leadsAssigned}</TableCell>
                <TableCell>{installer.conversionRate}%</TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(installer.status)} text-white`}>
                    {getStatusText(installer.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditClick(installer)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Éditer
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Détails
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <EditInstallerDialog
        installer={selectedInstaller}
        open={editDialogOpen}
        onOpenChange={handleEditClose}
        onSave={handleSaveInstaller}
      />
    </div>
  );
};

export default InstallerManagement;
