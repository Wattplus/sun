import { useState } from "react";
import { Lead } from "@/types/crm";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase-client";

export const useLeadOperations = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const { toast } = useToast();

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

  const deleteLead = async (leadId: string) => {
    try {
      const { error } = await supabase
        .from("leads")
        .delete()
        .eq("id", leadId);

      if (error) {
        console.error("Error deleting lead:", error);
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le lead",
          variant: "destructive",
        });
        return false;
      }

      setLeads(leads.filter(lead => lead.id !== leadId));
      toast({
        title: "Lead supprimé",
        description: "Le lead a été supprimé avec succès.",
      });
      return true;
    } catch (error) {
      console.error("Unexpected error deleting lead:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du lead",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateLead = async (updatedLead: Lead) => {
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
        return false;
      }

      setLeads(leads.map(lead => lead.id === updatedLead.id ? updatedLead : lead));
      toast({
        title: "Lead mis à jour",
        description: "Les modifications ont été enregistrées avec succès.",
      });
      return true;
    } catch (error) {
      console.error("Unexpected error updating lead:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du lead",
        variant: "destructive",
      });
      return false;
    }
  };

  const assignLead = async (leadId: string, installerId: string) => {
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
        return false;
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
      return true;
    } catch (error) {
      console.error("Unexpected error assigning lead:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'assignation du lead",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    leads,
    fetchLeads,
    deleteLead,
    updateLead,
    assignLead,
  };
};