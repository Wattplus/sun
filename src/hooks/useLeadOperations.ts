import { useState, useCallback, useEffect } from "react";
import { Lead } from "@/types/crm";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase-client";

export const useLeadOperations = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const { toast } = useToast();

  const fetchLeads = useCallback(async () => {
    console.log("[useLeadOperations] Début de fetchLeads");
    
    const { data: session } = await supabase.auth.getSession();
    if (session?.session?.user) {
      console.log("[useLeadOperations] Session active, utilisateur:", session.session.user.id);
      
      try {
        console.log("[useLeadOperations] Récupération des leads depuis Supabase...");
        const { data, error } = await supabase
          .from("leads")
          .select("*");

        if (error) {
          console.error("[useLeadOperations] Erreur lors de la récupération des leads:", error);
          toast({
            title: "Erreur",
            description: "Impossible de récupérer les leads",
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
          description: "Une erreur inattendue s'est produite",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  const deleteLead = async (leadId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("leads")
        .delete()
        .eq("id", leadId);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le lead",
          variant: "destructive",
        });
        return false;
      }

      await fetchLeads();
      return true;
    } catch (error) {
      console.error("Erreur lors de la suppression du lead:", error);
      return false;
    }
  };

  const updateLead = async (lead: Lead): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("leads")
        .update(lead)
        .eq("id", lead.id);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le lead",
          variant: "destructive",
        });
        return false;
      }

      await fetchLeads();
      return true;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du lead:", error);
      return false;
    }
  };

  const assignLead = async (leadId: string, installerId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ assigned_installer: installerId })
        .eq("id", leadId);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible d'assigner le lead",
          variant: "destructive",
        });
        return false;
      }

      await fetchLeads();
      return true;
    } catch (error) {
      console.error("Erreur lors de l'assignation du lead:", error);
      return false;
    }
  };

  // Set up real-time subscription
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
          fetchLeads();
        }
      )
      .subscribe();

    // Initial fetch
    fetchLeads();

    return () => {
      console.log("[useLeadOperations] Cleaning up realtime subscription");
      supabase.removeChannel(channel);
    };
  }, [fetchLeads]);

  return {
    leads,
    fetchLeads,
    deleteLead,
    updateLead,
    assignLead,
  };
};