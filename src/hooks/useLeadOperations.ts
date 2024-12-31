import { useState, useCallback, useEffect } from "react";
import { Lead } from "@/types/crm";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase-client";

export const useLeadOperations = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const { toast } = useToast();

  const fetchLeads = useCallback(async () => {
    try {
      console.log("[useLeadOperations] Début de fetchLeads");
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.error("[useLeadOperations] Pas de session active");
        toast({
          title: "Erreur d'authentification",
          description: "Vous devez être connecté pour voir les leads",
          variant: "destructive",
        });
        return;
      }

      console.log("[useLeadOperations] Session active, utilisateur:", session.user.id);
      console.log("[useLeadOperations] Récupération des leads depuis Supabase...");
      
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("[useLeadOperations] Erreur Supabase:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les leads: " + error.message,
          variant: "destructive",
        });
        return;
      }

      console.log("[useLeadOperations] Données reçues de Supabase:", data?.length, "leads");
      setLeads(data || []);
    } catch (error) {
      console.error("[useLeadOperations] Erreur inattendue:", error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue lors du chargement des leads",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Configurer l'écoute des changements en temps réel
  useEffect(() => {
    console.log("[useLeadOperations] Setting up realtime subscription");
    
    const channel = supabase
      .channel('public:leads')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads'
        },
        (payload) => {
          console.log('[useLeadOperations] Real-time update received:', payload);
          fetchLeads(); // Recharger les leads quand il y a des changements
        }
      )
      .subscribe();

    // Charger les leads initialement
    fetchLeads();

    return () => {
      console.log("[useLeadOperations] Cleaning up realtime subscription");
      supabase.removeChannel(channel);
    };
  }, [fetchLeads]);

  const deleteLead = async (leadId: string): Promise<boolean> => {
    try {
      console.log("[useLeadOperations] Suppression du lead:", leadId);
      const { error } = await supabase
        .from("leads")
        .delete()
        .eq("id", leadId);

      if (error) {
        console.error("[useLeadOperations] Erreur lors de la suppression:", error);
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le lead: " + error.message,
          variant: "destructive",
        });
        return false;
      }

      await fetchLeads();
      toast({
        title: "Succès",
        description: "Le lead a été supprimé avec succès",
      });
      return true;
    } catch (error) {
      console.error("[useLeadOperations] Erreur inattendue lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue lors de la suppression",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateLead = async (lead: Lead): Promise<boolean> => {
    try {
      console.log("[useLeadOperations] Mise à jour du lead:", lead);
      const { error } = await supabase
        .from("leads")
        .update(lead)
        .eq("id", lead.id);

      if (error) {
        console.error("[useLeadOperations] Erreur lors de la mise à jour:", error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le lead: " + error.message,
          variant: "destructive",
        });
        return false;
      }

      await fetchLeads();
      toast({
        title: "Succès",
        description: "Le lead a été mis à jour avec succès",
      });
      return true;
    } catch (error) {
      console.error("[useLeadOperations] Erreur inattendue lors de la mise à jour:", error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue lors de la mise à jour",
        variant: "destructive",
      });
      return false;
    }
  };

  const assignLead = async (leadId: string, installerId: string): Promise<boolean> => {
    try {
      console.log("[useLeadOperations] Attribution du lead:", { leadId, installerId });
      const { error } = await supabase
        .from("leads")
        .update({ assigned_installer: installerId, status: "assigned" })
        .eq("id", leadId);

      if (error) {
        console.error("[useLeadOperations] Erreur lors de l'attribution:", error);
        toast({
          title: "Erreur",
          description: "Impossible d'attribuer le lead: " + error.message,
          variant: "destructive",
        });
        return false;
      }

      await fetchLeads();
      toast({
        title: "Succès",
        description: "Le lead a été attribué avec succès",
      });
      return true;
    } catch (error) {
      console.error("[useLeadOperations] Erreur inattendue lors de l'attribution:", error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue lors de l'attribution",
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