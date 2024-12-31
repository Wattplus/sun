import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase-client';
import { Lead } from '@/types/crm';
import { toast } from 'sonner';

export const useLeadOperations = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeads = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log("[useLeadOperations] Fetching leads...");

      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        console.error("[useLeadOperations] No authenticated user found");
        toast.error("Veuillez vous connecter pour accéder à vos leads");
        return;
      }

      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*');

      if (leadsError) {
        console.error("[useLeadOperations] Error fetching leads:", leadsError);
        toast.error("Erreur lors du chargement des leads");
        return;
      }

      console.log("[useLeadOperations] Leads fetched successfully:", leadsData?.length);
      setLeads(leadsData || []);
    } catch (error) {
      console.error("[useLeadOperations] Unexpected error:", error);
      toast.error("Une erreur inattendue s'est produite");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateLead = async (updatedLead: Lead): Promise<boolean> => {
    try {
      console.log("[useLeadOperations] Updating lead:", updatedLead);
      const { error } = await supabase
        .from('leads')
        .update(updatedLead)
        .eq('id', updatedLead.id);

      if (error) {
        console.error("[useLeadOperations] Error updating lead:", error);
        toast.error("Erreur lors de la mise à jour du lead");
        return false;
      }

      await fetchLeads(); // Refresh leads after update
      toast.success("Lead mis à jour avec succès");
      return true;
    } catch (error) {
      console.error("[useLeadOperations] Error in updateLead:", error);
      toast.error("Erreur lors de la mise à jour du lead");
      return false;
    }
  };

  const deleteLead = async (leadId: string): Promise<boolean> => {
    try {
      console.log("[useLeadOperations] Deleting lead:", leadId);
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);

      if (error) {
        console.error("[useLeadOperations] Error deleting lead:", error);
        toast.error("Erreur lors de la suppression du lead");
        return false;
      }

      await fetchLeads(); // Refresh leads after deletion
      toast.success("Lead supprimé avec succès");
      return true;
    } catch (error) {
      console.error("[useLeadOperations] Error in deleteLead:", error);
      toast.error("Erreur lors de la suppression du lead");
      return false;
    }
  };

  const assignLead = async (leadId: string, installerId: string): Promise<boolean> => {
    try {
      console.log("[useLeadOperations] Assigning lead:", { leadId, installerId });
      const { error } = await supabase
        .from('leads')
        .update({ assigned_installer: installerId })
        .eq('id', leadId);

      if (error) {
        console.error("[useLeadOperations] Error assigning lead:", error);
        toast.error("Erreur lors de l'assignation du lead");
        return false;
      }

      await fetchLeads(); // Refresh leads after assignment
      toast.success("Lead assigné avec succès");
      return true;
    } catch (error) {
      console.error("[useLeadOperations] Error in assignLead:", error);
      toast.error("Erreur lors de l'assignation du lead");
      return false;
    }
  };

  return {
    leads,
    isLoading,
    fetchLeads,
    updateLead,
    deleteLead,
    assignLead,
  };
};