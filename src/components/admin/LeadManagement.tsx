import { useState, useEffect } from "react";
import { Lead } from "@/types/crm";
import { LeadTable } from "./leads/LeadTable";
import { LeadMobileTable } from "./leads/LeadMobileTable";
import { LeadHeader } from "./leads/LeadHeader";
import { LeadStats } from "./leads/LeadStats";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { LeadDialogs } from "./leads/LeadDialogs";
import { useLeadOperations } from "@/hooks/useLeadOperations";
import { getStatusColor, getStatusText } from "@/utils/leadStatus";
import { useIsMobile } from "@/hooks/use-mobile";

export const LeadManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInstallerId, setSelectedInstallerId] = useState<string>("");
  const [leadToAssign, setLeadToAssign] = useState<Lead | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  
  const { leads, fetchLeads, deleteLead, updateLead, assignLead } = useLeadOperations();
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDeleteClick = (lead: Lead) => {
    setLeadToDelete(lead);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!leadToDelete) return;
    const success = await deleteLead(leadToDelete.id);
    if (success) {
      setDeleteDialogOpen(false);
      setLeadToDelete(null);
    }
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
    const success = await updateLead(updatedLead);
    if (success) {
      handleEditClose();
    }
  };

  const handleAssignSubmit = async (leadId: string, installerId: string) => {
    const success = await assignLead(leadId, installerId);
    if (success) {
      setAssignDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <AdminBreadcrumb />
      <LeadStats leads={leads} />

      <div className="glass-panel p-4 lg:p-6">
        <LeadHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onExportClick={() => console.log("Exporting to CSV...")}
          onNewLeadClick={() => {
            setSelectedLead(null);
            setEditDialogOpen(true);
          }}
        />

        {isMobile ? (
          <LeadMobileTable
            leads={leads}
            onEditClick={handleEditClick}
            onAssignClick={handleAssignClick}
            onDeleteClick={handleDeleteClick}
            getStatusColor={getStatusColor}
            getStatusText={getStatusText}
          />
        ) : (
          <LeadTable
            leads={leads}
            onEditClick={handleEditClick}
            onAssignClick={handleAssignClick}
            onDeleteClick={handleDeleteClick}
            getStatusColor={getStatusColor}
            getStatusText={getStatusText}
          />
        )}

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