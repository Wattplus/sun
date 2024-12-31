import { useState, useEffect } from "react";
import { Lead } from "@/types/crm";
import { useLeadOperations } from "@/hooks/useLeadOperations";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/components/ui/use-toast";
import { LeadManagementContent } from "./LeadManagementContent";
import { Loader2 } from "lucide-react";

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
      try {
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

        // Vérifier le rôle de l'utilisateur
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError || !profile) {
          console.error("LeadManagement: Erreur de profil:", profileError);
          toast({
            title: "Erreur",
            description: "Impossible de vérifier vos permissions",
            variant: "destructive",
          });
          return;
        }

        if (!['admin', 'super_admin'].includes(profile.role)) {
          console.error("LeadManagement: Accès non autorisé");
          toast({
            title: "Accès refusé",
            description: "Vous n'avez pas les permissions nécessaires",
            variant: "destructive",
          });
          return;
        }

        console.log("LeadManagement: Session active, utilisateur:", session.user.id);
        console.log("LeadManagement: Récupération des leads...");
        await fetchLeads();
      } catch (error) {
        console.error("LeadManagement: Erreur inattendue:", error);
        toast({
          title: "Erreur",
          description: "Une erreur inattendue s'est produite",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndFetchLeads();
  }, [fetchLeads, toast]);

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
      <div className="min-h-screen bg-gradient-to-b from-background/95 to-background/50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-lg text-muted-foreground">Chargement des leads...</p>
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