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
import { Card } from "@/components/ui/card";

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
    console.log("LeadManagement: Fetching leads...");
    fetchLeads();
  }, []);

  useEffect(() => {
    console.log("LeadManagement: Leads updated:", leads);
  }, [leads]);

  const handleDeleteClick = (lead: Lead) => {
    console.log("LeadManagement: Handling delete for lead:", lead);
    setLeadToDelete(lead);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!leadToDelete) return;
    console.log("LeadManagement: Confirming delete for lead:", leadToDelete);
    const success = await deleteLead(leadToDelete.id);
    if (success) {
      setDeleteDialogOpen(false);
      setLeadToDelete(null);
    }
  };

  const handleEditClick = (lead: Lead) => {
    console.log("LeadManagement: Handling edit for lead:", lead);
    setSelectedLead(lead);
    setEditDialogOpen(true);
  };

  const handleAssignClick = (lead: Lead) => {
    console.log("LeadManagement: Handling assign for lead:", lead);
    setLeadToAssign(lead);
    setAssignDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedLead(null);
    setEditDialogOpen(false);
  };

  const handleSaveLead = async (updatedLead: Lead) => {
    console.log("LeadManagement: Saving lead:", updatedLead);
    const success = await updateLead(updatedLead);
    if (success) {
      handleEditClose();
    }
  };

  const handleAssignSubmit = async (leadId: string, installerId: string) => {
    console.log("LeadManagement: Assigning lead:", { leadId, installerId });
    const success = await assignLead(leadId, installerId);
    if (success) {
      setAssignDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/95 to-background/50 py-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <AdminBreadcrumb />
        
        <div className="space-y-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              Gestion des Leads
            </h1>
            <p className="text-muted-foreground text-lg">
              Gérez efficacement vos prospects et suivez leur progression
            </p>
          </div>

          <LeadStats leads={leads} />

          <Card className="overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm">
            <div className="p-6 space-y-6">
              <LeadHeader
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onExportClick={() => console.log("Exporting to CSV...")}
                onNewLeadClick={() => {
                  setSelectedLead(null);
                  setEditDialogOpen(true);
                }}
              />

              <div className="rounded-md border border-primary/10 bg-background/50">
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
              </div>
            </div>
          </Card>

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
    </div>
  );
};

export default LeadManagement;