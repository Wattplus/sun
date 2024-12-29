import { useState } from "react";
import { Lead, LeadStatus } from "@/types/crm";
import { LeadTable } from "./leads/LeadTable";
import { LeadHeader } from "./leads/LeadHeader";
import { LeadStats } from "./leads/LeadStats";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { LeadDialogs } from "./leads/LeadDialogs";
import { useLeadsData } from "./leads/useLeadsData";
import { useLeadActions } from "./leads/useLeadActions";

export const LeadManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInstallerId, setSelectedInstallerId] = useState<string>("");
  const [leadToAssign, setLeadToAssign] = useState<Lead | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);

  const { leads, setLeads } = useLeadsData();
  const { handleDeleteLead, handleUpdateLead } = useLeadActions(leads, setLeads);

  const handleDeleteClick = (lead: Lead) => {
    setLeadToDelete(lead);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!leadToDelete) return;
    await handleDeleteLead(leadToDelete.id);
    setDeleteDialogOpen(false);
    setLeadToDelete(null);
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

  const handleSaveLead = async (updatedLead: Lead) => {
    await handleUpdateLead(updatedLead);
    handleEditClose();
  };

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
          handleAssignSubmit={() => leadToAssign && selectedInstallerId ? handleAssignSubmit(leadToAssign.id, selectedInstallerId) : undefined}
          handleConfirmDelete={handleConfirmDelete}
        />
      </div>
    </div>
  );
};

export default LeadManagement;