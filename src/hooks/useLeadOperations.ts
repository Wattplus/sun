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

      // Récupérer d'abord l'ID de l'installateur
      const { data: installerData, error: installerError } = await supabase
        .from('installers')
        .select('id')
        .eq('user_id', session.session.user.id)
        .single();

      if (installerError) {
        console.error("[useLeadOperations] Error fetching installer:", installerError);
        toast.error("Erreur lors de la récupération des données de l'installateur");
        return;
      }

      if (!installerData?.id) {
        console.error("[useLeadOperations] No installer ID found");
        toast.error("Profil installateur non trouvé");
        return;
      }

      // Récupérer les leads disponibles et achetés
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .or(`purchasedby.cs.{${installerData.id}},assigned_installer.eq.${installerData.id}`);

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

  return {
    leads,
    isLoading,
    fetchLeads,
  };
};