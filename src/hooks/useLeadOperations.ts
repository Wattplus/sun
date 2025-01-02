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

      console.log("[useLeadOperations] User ID:", session.session.user.id);

      // Récupérer d'abord l'ID de l'installateur
      const { data: installerData, error: installerError } = await supabase
        .from("installers")
        .select("id")
        .eq("user_id", session.session.user.id)
        .maybeSingle();

      if (installerError) {
        console.error("[useLeadOperations] Error fetching installer:", installerError);
        setError("Erreur lors de la récupération du profil installateur");
        return;
      }

      if (!installerData) {
        console.log("[useLeadOperations] No installer profile found");
        setError("Vous devez d'abord compléter votre profil installateur");
        return;
      }

      console.log("[useLeadOperations] Installer ID:", installerData.id);

      // Récupérer les leads pour cet installateur
      const { data: leadsData, error: leadsError } = await supabase
        .from("leads")
        .select("*")
        .or(`purchasedby.cs.{${installerData.id}},assigned_installer.eq.${installerData.id}`);

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
    fetchLeads();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('leads-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all changes (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'leads'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          
          // Refresh the leads list to ensure we have the latest data
          fetchLeads();
          
          // Show a toast notification
          const eventMessages = {
            INSERT: 'Nouveau lead ajouté',
            UPDATE: 'Lead mis à jour',
            DELETE: 'Lead supprimé'
          };
          
          toast(eventMessages[payload.eventType as keyof typeof eventMessages], {
            description: "La liste des leads a été mise à jour"
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchLeads]);

  const updateLead = async (updatedLead: Lead) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update(updatedLead)
        .eq('id', updatedLead.id);

      if (error) throw error;

      toast.success("Lead mis à jour avec succès");
      return true;
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error("Erreur lors de la mise à jour du lead");
      return false;
    }
  };

  const deleteLead = async (leadId: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);

      if (error) throw error;

      toast.success("Lead supprimé avec succès");
      return true;
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast.error("Erreur lors de la suppression du lead");
      return false;
    }
  };

  const assignLead = async (leadId: string, installerId: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ assigned_installer: installerId })
        .eq('id', leadId);

      if (error) throw error;

      toast.success("Lead assigné avec succès");
      return true;
    } catch (error) {
      console.error('Error assigning lead:', error);
      toast.error("Erreur lors de l'assignation du lead");
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
