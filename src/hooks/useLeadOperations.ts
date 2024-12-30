import { useState, useCallback } from "react";
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

  return {
    leads,
    fetchLeads,
  };
};