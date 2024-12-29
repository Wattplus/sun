import { useState } from "react";
import { Lead } from "@/types/crm";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase-client";

export const useLeadOperations = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const { toast } = useToast();

  const fetchLeads = async () => {
    try {
      console.log("useLeadOperations: Vérifiant la session...");
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.error("useLeadOperations: Pas de session active");
        toast({
          title: "Erreur d'authentification",
          description: "Vous devez être connecté pour voir les leads",
          variant: "destructive",
        });
        return;
      }

      console.log("useLeadOperations: Session active, récupération des leads...");
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erreur lors de la récupération des leads:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les leads",
          variant: "destructive",
        });
        return;
      }

      console.log("useLeadOperations: Leads récupérés avec succès:", data);
      setLeads(data || []);
      
      if (!data || data.length === 0) {
        console.log("useLeadOperations: Aucun lead trouvé");
        toast({
          title: "Information",
          description: "Aucun lead disponible pour le moment",
        });
      }
    } catch (error) {
      console.error("Erreur inattendue lors de la récupération des leads:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du chargement des leads",
        variant: "destructive",
      });
    }
  };

  const deleteLead = async (leadId: string) => {
    try {
      console.log("useLeadOperations: Suppression du lead:", leadId);
      const { error } = await supabase
        .from("leads")
        .delete()
        .eq("id", leadId);

      if (error) {
        console.error("Erreur lors de la suppression du lead:", error);
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
      console.error("Erreur inattendue lors de la suppression du lead:", error);
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
      console.log("useLeadOperations: Mise à jour du lead:", updatedLead);
      const { error } = await supabase
        .from("leads")
        .update(updatedLead)
        .eq("id", updatedLead.id);

      if (error) {
        console.error("Erreur lors de la mise à jour du lead:", error);
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
      console.error("Erreur inattendue lors de la mise à jour du lead:", error);
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
      console.log("useLeadOperations: Attribution du lead:", { leadId, installerId });
      const { error } = await supabase
        .from("leads")
        .update({ assignedto: installerId })
        .eq("id", leadId);

      if (error) {
        console.error("Erreur lors de l'attribution du lead:", error);
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
      console.error("Erreur inattendue lors de l'attribution du lead:", error);
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