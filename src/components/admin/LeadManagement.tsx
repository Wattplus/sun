import { useState, useEffect } from "react";
import { Lead, LeadStatus } from "@/types/crm";
import { LeadTable } from "./leads/LeadTable";
import { LeadHeader } from "./leads/LeadHeader";
import { LeadStats } from "./leads/LeadStats";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { LeadDialogs } from "./leads/LeadDialogs";
import { useLeadActions } from "./leads/useLeadActions";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase-client";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

export const LeadManagement = () => {
  useAuthRedirect();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInstallerId, setSelectedInstallerId] = useState<string>("");
  const [leadToAssign, setLeadToAssign] = useState<Lead | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { handleDeleteLead, handleUpdateLead } = useLeadActions(leads, setLeads);
  const { toast } = useToast();

  useEffect(() => {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [toast]);

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

  const handleAssignSubmit = async (leadId: string, installerId: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ 
          assignedto: installerId,
          status: 'assigned' as LeadStatus
        })
        .eq('id', leadId);

      if (error) {
        console.error('Error assigning lead:', error);
        toast({
          title: "Erreur",
          description: "Impossible d'assigner le lead",
          variant: "destructive",
        });
        return;
      }

      setLeads(leads.map(lead => 
        lead.id === leadId 
          ? { ...lead, assignedto: installerId, status: 'assigned' } 
          : lead
      ));

      toast({
        title: "Lead assigné",
        description: "Le lead a été assigné avec succès",
      });

      setAssignDialogOpen(false);
      setSelectedInstallerId("");
      setLeadToAssign(null);
    } catch (error) {
      console.error('Unexpected error assigning lead:', error);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

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
          leads={leads.filter(lead => 
            lead.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.phone?.includes(searchTerm)
          )}
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