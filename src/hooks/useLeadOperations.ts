import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";
import { Lead } from "@/types/crm";
import { toast } from "sonner";

export const useLeadOperations = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        console.error("[useLeadOperations] No session found");
        setError("Veuillez vous connecter pour accéder à vos leads");
        return;
      }

      console.log("[useLeadOperations] Fetching leads...");
      const { data: leadsData, error: leadsError } = await supabase
        .from("leads")
        .select("*")
        .order('created_at', { ascending: false });

      if (leadsError) {
        console.error("[useLeadOperations] Error fetching leads:", leadsError);
        setError("Erreur lors de la récupération des leads");
        return;
      }

      console.log("[useLeadOperations] Fetched leads:", leadsData?.length);
      setLeads(leadsData || []);
    } catch (error) {
      console.error("[useLeadOperations] Unexpected error:", error);
      setError("Une erreur inattendue s'est produite");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("[useLeadOperations] Initial leads fetch");
    fetchLeads();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('leads-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads'
        },
        async (payload) => {
          console.log('[useLeadOperations] Real-time update received:', payload);
          
          // Refresh the leads list to ensure we have the latest data
          await fetchLeads();
          
          // Show appropriate notification based on the event type
          switch (payload.eventType) {
            case 'INSERT':
              toast("Nouveau lead ajouté", {
                description: "La liste des leads a été mise à jour"
              });
              break;
            case 'UPDATE':
              toast("Lead mis à jour", {
                description: "Les informations du lead ont été modifiées"
              });
              break;
            case 'DELETE':
              toast("Lead supprimé", {
                description: "Un lead a été retiré de la liste"
              });
              break;
          }
        }
      )
      .subscribe((status) => {
        console.log("[useLeadOperations] Subscription status:", status);
      });

    return () => {
      console.log("[useLeadOperations] Cleaning up subscription");
      supabase.removeChannel(channel);
    };
  }, [fetchLeads]);

  const updateLead = async (updatedLead: Lead) => {
    try {
      console.log("[useLeadOperations] Updating lead:", updatedLead);
      const { error } = await supabase
        .from('leads')
        .update(updatedLead)
        .eq('id', updatedLead.id);

      if (error) throw error;

      toast("Lead mis à jour avec succès");
      return true;
    } catch (error) {
      console.error('[useLeadOperations] Error updating lead:', error);
      toast("Erreur lors de la mise à jour du lead");
      return false;
    }
  };

  const deleteLead = async (leadId: string) => {
    try {
      console.log("[useLeadOperations] Deleting lead:", leadId);
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);

      if (error) throw error;

      toast("Lead supprimé avec succès");
      return true;
    } catch (error) {
      console.error('[useLeadOperations] Error deleting lead:', error);
      toast("Erreur lors de la suppression du lead");
      return false;
    }
  };

  const assignLead = async (leadId: string, installerId: string) => {
    try {
      console.log("[useLeadOperations] Assigning lead:", { leadId, installerId });
      const { error } = await supabase
        .from('leads')
        .update({ assigned_installer: installerId })
        .eq('id', leadId);

      if (error) throw error;

      toast("Lead assigné avec succès");
      return true;
    } catch (error) {
      console.error('[useLeadOperations] Error assigning lead:', error);
      toast("Erreur lors de l'assignation du lead");
      return false;
    }
  };

  return {
    leads,
    isLoading,
    error,
    fetchLeads,
    updateLead,
    deleteLead,
    assignLead
  };
};