import { useState, useEffect } from "react";
import { Lead, LeadStatus } from "@/types/crm";
import { useToast } from "@/components/ui/use-toast";
import { LeadTable } from "./leads/LeadTable";
import { LeadMobileTable } from "./leads/LeadMobileTable";
import { LeadHeader } from "./leads/LeadHeader";
import { LeadStats } from "./leads/LeadStats";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { LeadDialogs } from "./leads/LeadDialogs";
import { mockInstallers } from "./InstallerManagement";
import { supabase } from "@/lib/supabase-client";
import { useIsMobile } from "@/hooks/use-mobile";

export const LeadManagement = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInstallerId, setSelectedInstallerId] = useState<string>("");
  const [leadToAssign, setLeadToAssign] = useState<Lead | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      console.log("Fetching leads...");
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching leads:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les leads",
          variant: "destructive",
        });
        return;
      }

      console.log("Leads fetched successfully:", data);
      setLeads(data || []);
    } catch (error) {
      console.error("Unexpected error fetching leads:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du chargement des leads",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = (lead: Lead) => {
    setLeadToDelete(lead);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!leadToDelete) return;
    
    try {
      const { error } = await supabase
        .from("leads")
        .delete()
        .eq("id", leadToDelete.id);

      if (error) {
        console.error("Error deleting lead:", error);
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le lead",
          variant: "destructive",
        });
        return;
      }

      setLeads(leads.filter(lead => lead.id !== leadToDelete.id));
      toast({
        title: "Lead supprimé",
        description: "Le lead a été supprimé avec succès.",
      });
      setDeleteDialogOpen(false);
      setLeadToDelete(null);
    } catch (error) {
      console.error("Unexpected error deleting lead:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du lead",
        variant: "destructive",
      });
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
    try {
      const { error } = await supabase
        .from("leads")
        .update(updatedLead)
        .eq("id", updatedLead.id);

      if (error) {
        console.error("Error updating lead:", error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le lead",
          variant: "destructive",
        });
        return;
      }

      setLeads(leads.map(lead => lead.id === updatedLead.id ? updatedLead : lead));
      toast({
        title: "Lead mis à jour",
        description: "Les modifications ont été enregistrées avec succès.",
      });
      handleEditClose();
    } catch (error) {
      console.error("Unexpected error updating lead:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du lead",
        variant: "destructive",
      });
    }
  };

  const handleAssignSubmit = async (leadId: string, installerId: string) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ assignedto: installerId })
        .eq("id", leadId);

      if (error) {
        console.error("Error assigning lead:", error);
        toast({
          title: "Erreur",
          description: "Impossible d'assigner le lead",
          variant: "destructive",
        });
        return;
      }

      setLeads(leads.map(lead => 
        lead.id === leadId 
          ? { ...lead, assignedto: installerId }
          : lead
      ));

      toast({
        title: "Lead assigné",
        description: "Le lead a été assigné avec succès.",
      });
      setAssignDialogOpen(false);
    } catch (error) {
      console.error("Unexpected error assigning lead:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'assignation du lead",
        variant: "destructive",
      });
    }
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