import { useState } from "react";
import { Lead, LeadStatus, mockLeads } from "@/types/crm";
import { useToast } from "@/components/ui/use-toast";
import { EditLeadDialog } from "./EditLeadDialog";
import { LeadTable } from "./leads/LeadTable";
import { LeadHeader } from "./leads/LeadHeader";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { mockInstallers } from "./InstallerManagement";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Euro, Users, TrendingUp, AlertCircle } from "lucide-react";

const LeadManagement = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedInstallerId, setSelectedInstallerId] = useState<string>("");
  const [leadToAssign, setLeadToAssign] = useState<Lead | null>(null);
  const { toast } = useToast();

  const getStatusColor = (status: LeadStatus) => {
    const colors = {
      new: "bg-[#1EAEDB]",
      contacted: "bg-[#33C3F0]",
      qualified: "bg-[#0FA0CE]",
      assigned: "bg-[#1EAEDB]",
      converted: "bg-emerald-500",
      lost: "bg-red-500"
    };
    return colors[status];
  };

  const getStatusText = (status: LeadStatus) => {
    const texts = {
      new: "Nouveau",
      contacted: "Contacté",
      qualified: "Qualifié",
      assigned: "Assigné",
      converted: "Converti",
      lost: "Perdu"
    };
    return texts[status];
  };

  const handleEditClick = (lead: Lead) => {
    setSelectedLead(lead);
    setEditDialogOpen(true);
  };

  const handleAssignClick = (lead: Lead) => {
    setLeadToAssign(lead);
    setAssignDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedLead(null);
    setEditDialogOpen(false);
  };

  const handleSaveLead = (updatedLead: Lead) => {
    setLeads(leads.map(lead => lead.id === updatedLead.id ? updatedLead : lead));
    toast({
      title: "Lead mis à jour",
      description: "Les modifications ont été enregistrées avec succès.",
    });
    handleEditClose();
  };

  const handleAssignSubmit = () => {
    if (!leadToAssign || !selectedInstallerId) return;

    const installer = mockInstallers.find(i => i.id === selectedInstallerId);
    if (!installer) return;

    const updatedLead = {
      ...leadToAssign,
      status: "assigned" as LeadStatus,
      assignedTo: installer.companyName
    };

    setLeads(leads.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead
    ));

    toast({
      title: "Lead assigné avec succès",
      description: `Le lead a été assigné à ${installer.companyName}`,
    });

    setAssignDialogOpen(false);
    setSelectedInstallerId("");
    setLeadToAssign(null);
  };

  const exportToCSV = () => {
    console.log("Exporting to CSV...");
  };

  // Statistiques des leads
  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(lead => lead.status === "qualified").length;
  const convertedLeads = leads.filter(lead => lead.status === "converted").length;
  const totalRevenue = leads.reduce((acc, lead) => acc + lead.price, 0);

  return (
    <div className="space-y-6">
      <AdminBreadcrumb />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-background/50 backdrop-blur-md border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-[#1EAEDB]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
          </CardContent>
        </Card>
        <Card className="bg-background/50 backdrop-blur-md border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Qualifiés</CardTitle>
            <AlertCircle className="h-4 w-4 text-[#33C3F0]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{qualifiedLeads}</div>
          </CardContent>
        </Card>
        <Card className="bg-background/50 backdrop-blur-md border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Convertis</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{convertedLeads}</div>
          </CardContent>
        </Card>
        <Card className="bg-background/50 backdrop-blur-md border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
            <Euro className="h-4 w-4 text-[#0FA0CE]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue}€</div>
          </CardContent>
        </Card>
      </div>

      <div className="glass-panel p-6">
        <LeadHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onExportClick={exportToCSV}
          onNewLeadClick={() => {
            setSelectedLead(null);
            setEditDialogOpen(true);
          }}
        />

        <LeadTable
          leads={leads}
          onEditClick={handleEditClick}
          onAssignClick={handleAssignClick}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
        />

        <EditLeadDialog
          lead={selectedLead}
          open={editDialogOpen}
          onOpenChange={handleEditClose}
          onSave={handleSaveLead}
        />

        <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
          <DialogContent className="bg-background/95 backdrop-blur-md border-[#33C3F0]/20">
            <DialogHeader>
              <DialogTitle>Assigner le lead à un installateur</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Select value={selectedInstallerId} onValueChange={setSelectedInstallerId}>
                <SelectTrigger className="bg-background/50 border-[#33C3F0]/20">
                  <SelectValue placeholder="Sélectionner un installateur" />
                </SelectTrigger>
                <SelectContent>
                  {mockInstallers
                    .filter(installer => installer.status === "active")
                    .map(installer => (
                      <SelectItem key={installer.id} value={installer.id}>
                        {installer.companyName}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setAssignDialogOpen(false)}
                className="border-[#33C3F0]/20 hover:border-[#33C3F0]/40"
              >
                Annuler
              </Button>
              <Button
                onClick={handleAssignSubmit}
                disabled={!selectedInstallerId}
                className="bg-[#1EAEDB] hover:bg-[#0FA0CE]"
              >
                Confirmer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LeadManagement;