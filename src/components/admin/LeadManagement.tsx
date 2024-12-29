import { useState } from "react";
import { Lead, LeadStatus } from "@/types/crm";
import { useToast } from "@/components/ui/use-toast";
import { LeadTable } from "./leads/LeadTable";
import { LeadHeader } from "./leads/LeadHeader";
import { LeadStats } from "./leads/LeadStats";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { LeadDialogs } from "./leads/LeadDialogs";
import { mockInstallers } from "./InstallerManagement";

export const mockLeads: Lead[] = [];

const LeadManagement = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInstallerId, setSelectedInstallerId] = useState<string>("");
  const [leadToAssign, setLeadToAssign] = useState<Lead | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
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

  const handleDeleteClick = (lead: Lead) => {
    setLeadToDelete(lead);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!leadToDelete) return;
    
    setLeads(leads.filter(lead => lead.id !== leadToDelete.id));
    toast({
      title: "Lead supprimé",
      description: "Le lead a été supprimé avec succès.",
    });
    setDeleteDialogOpen(false);
    setLeadToDelete(null);
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

  return (
    <div className="space-y-6">
      <AdminBreadcrumb />
      <LeadStats leads={leads} />

      <div className="glass-panel p-6">
        <LeadHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onExportClick={() => console.log("Exporting to CSV...")}
          onNewLeadClick={() => {
            setSelectedLead(null);
            setEditDialogOpen(true);
          }}
        />

        <LeadTable
          leads={leads}
          onEditClick={handleEditClick}
          onAssignClick={handleAssignClick}
          onDeleteClick={handleDeleteClick}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
        />

        <LeadDialogs
          selectedLead={selectedLead}
          editDialogOpen={editDialogOpen}
          assignDialogOpen={assignDialogOpen}
          deleteDialogOpen={deleteDialogOpen}
          selectedInstallerId={selectedInstallerId}
          leadToAssign={leadToAssign}
          onEditClose={handleEditClose}
          onSaveLead={handleSaveLead}
          setAssignDialogOpen={setAssignDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          setSelectedInstallerId={setSelectedInstallerId}
          handleAssignSubmit={handleAssignSubmit}
          handleConfirmDelete={handleConfirmDelete}
        />
      </div>
    </div>
  );
};

export default LeadManagement;