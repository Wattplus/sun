import { useState } from "react";
import { Lead } from "@/types/crm";
import { LeadDialogs } from "./LeadDialogs";
import { useToast } from "@/components/ui/use-toast";
import { useLeadOperations } from "@/hooks/useLeadOperations";

export const useLeadDialogManager = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInstallerId, setSelectedInstallerId] = useState<string>("");
  const [leadToAssign, setLeadToAssign] = useState<Lead | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);

  const { updateLead, deleteLead, assignLead } = useLeadOperations();
  const { toast } = useToast();

  const handleDeleteClick = (lead: Lead) => {
    console.log("LeadManagement: Demande de suppression pour le lead:", lead);
    setLeadToDelete(lead);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!leadToDelete) return;
    console.log("LeadManagement: Confirmation de suppression pour le lead:", leadToDelete);
    const success = await deleteLead(leadToDelete.id);
    if (success) {
      setDeleteDialogOpen(false);
      setLeadToDelete(null);
    }
  };

  const handleEditClick = (lead: Lead) => {
    console.log("LeadManagement: Demande de modification pour le lead:", lead);
    setSelectedLead(lead);
    setEditDialogOpen(true);
  };

  const handleAssignClick = (lead: Lead) => {
    console.log("LeadManagement: Demande d'assignation pour le lead:", lead);
    setLeadToAssign(lead);
    setAssignDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedLead(null);
    setEditDialogOpen(false);
  };

  const handleSaveLead = async (updatedLead: Lead) => {
    console.log("LeadManagement: Sauvegarde du lead:", updatedLead);
    const success = await updateLead(updatedLead);
    if (success) {
      handleEditClose();
    }
  };

  const handleAssignSubmit = async (leadId: string, installerId: string) => {
    console.log("LeadManagement: Attribution du lead:", { leadId, installerId });
    const success = await assignLead(leadId, installerId);
    if (success) {
      setAssignDialogOpen(false);
    }
  };

  const renderDialogs = () => (
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
  );

  return {
    handleDeleteClick,
    handleEditClick,
    handleAssignClick,
    renderDialogs,
  };
};