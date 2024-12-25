import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Lead, LeadStatus, mockLeads } from "@/types/crm";
import { Search, Download, Plus, Edit } from "lucide-react";
import { EditLeadDialog } from "./EditLeadDialog";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LeadManagement = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const getStatusColor = (status: LeadStatus) => {
    const colors = {
      new: "bg-blue-500",
      contacted: "bg-yellow-500",
      qualified: "bg-green-500",
      assigned: "bg-purple-500",
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

  const handleEditClose = () => {
    setSelectedLead(null);
    setEditDialogOpen(false);
  };

  const exportToCSV = () => {
    console.log("Exporting to CSV...");
  };

  const handleSaveLead = (updatedLead: Lead) => {
    setLeads(leads.map(lead => lead.id === updatedLead.id ? updatedLead : lead));
    toast({
      title: "Lead mis à jour",
      description: "Les modifications ont été enregistrées avec succès.",
    });
    handleEditClose();
  };

  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedInstallerId, setSelectedInstallerId] = useState<string>("");
  const [leadToAssign, setLeadToAssign] = useState<Lead | null>(null);

  const handleAssignClick = (lead: Lead) => {
    setLeadToAssign(lead);
    setAssignDialogOpen(true);
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

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Gestion des Leads</h2>
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
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Lead
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[600px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>Projet</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Assigné à</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="font-medium">{`${lead.firstName} ${lead.lastName}`}</div>
                  <div className="text-sm text-gray-500">{lead.email}</div>
                  <div className="text-sm text-gray-500">{lead.phone}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{lead.city}</div>
                  <div className="text-sm text-gray-500">{lead.postalCode}</div>
                </TableCell>
                <TableCell>{lead.projectType}</TableCell>
                <TableCell>{lead.budget.toLocaleString()}€</TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(lead.status)} text-white`}>
                    {getStatusText(lead.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {lead.assignedTo || "-"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditClick(lead)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Éditer
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAssignClick(lead)}
                      disabled={lead.status === "assigned" || lead.status === "converted"}
                    >
                      Assigner
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <EditLeadDialog
        lead={selectedLead}
        open={editDialogOpen}
        onOpenChange={handleEditClose}
        onSave={handleSaveLead}
      />

      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assigner le lead à un installateur</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Select value={selectedInstallerId} onValueChange={setSelectedInstallerId}>
              <SelectTrigger>
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
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAssignSubmit} disabled={!selectedInstallerId}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadManagement;
