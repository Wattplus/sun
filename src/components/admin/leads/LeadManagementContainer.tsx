import { useState, useEffect } from "react";
import { Lead } from "@/types/crm";
import { LeadTable } from "./LeadTable";
import { LeadMobileTable } from "./LeadMobileTable";
import { LeadHeader } from "./LeadHeader";
import { LeadStats } from "./LeadStats";
import { AdminBreadcrumb } from "../AdminBreadcrumb";
import { LeadDialogs } from "./LeadDialogs";
import { useLeadOperations } from "@/hooks/useLeadOperations";
import { getStatusColor, getStatusText } from "@/utils/leadStatus";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/components/ui/use-toast";
import { LeadManagementContent } from "./LeadManagementContent";

export const LeadManagementContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInstallerId, setSelectedInstallerId] = useState<string>("");
  const [leadToAssign, setLeadToAssign] = useState<Lead | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { leads, fetchLeads, deleteLead, updateLead, assignLead } = useLeadOperations();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuthAndFetchLeads = async () => {
      console.log("LeadManagement: Vérification de l'authentification...");
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("LeadManagement: Erreur de session:", sessionError);
        toast({
          title: "Erreur d'authentification",
          description: "Impossible de vérifier votre session",
          variant: "destructive",
        });
        return;
      }

      if (!session) {
        console.error("LeadManagement: Pas de session active");
        toast({
          title: "Non authentifié",
          description: "Vous devez être connecté pour accéder à cette page",
          variant: "destructive",
        });
        return;
      }

      console.log("LeadManagement: Session active, utilisateur:", session.user.id);
      console.log("LeadManagement: Récupération des leads...");
      await fetchLeads();
      setIsLoading(false);
    };

    checkAuthAndFetchLeads();
  }, []);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background/95 to-background/50 py-8">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">Chargement des leads...</p>
        </div>
      </div>
    );
  }

  return (
    <LeadManagementContent 
      leads={leads}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      selectedLead={selectedLead}
      editDialogOpen={editDialogOpen}
      assignDialogOpen={assignDialogOpen}
      deleteDialogOpen={deleteDialogOpen}
      selectedInstallerId={selectedInstallerId}
      leadToAssign={leadToAssign}
      isMobile={isMobile}
      handleEditClick={handleEditClick}
      handleAssignClick={handleAssignClick}
      handleDeleteClick={handleDeleteClick}
      handleEditClose={handleEditClose}
      handleSaveLead={handleSaveLead}
      setAssignDialogOpen={setAssignDialogOpen}
      setDeleteDialogOpen={setDeleteDialogOpen}
      setSelectedInstallerId={setSelectedInstallerId}
      handleAssignSubmit={handleAssignSubmit}
      handleConfirmDelete={handleConfirmDelete}
    />
  );
};

export default LeadManagementContainer;