import { useState, useEffect } from "react";
import { Lead } from "@/types/crm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase-client";

export const useLeadsData = () => {
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

  useEffect(() => {
    fetchLeads();
  }, []);

  return { leads, setLeads, fetchLeads };
};