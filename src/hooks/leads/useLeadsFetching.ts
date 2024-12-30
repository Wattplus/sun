import { useState, useEffect } from "react";
import { Lead } from "@/types/crm";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";

export const useLeadsFetching = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .eq('status', 'new')
          .is('purchasedby', null);

        if (error) {
          console.error("Error fetching leads:", error);
          toast.error("Erreur lors de la récupération des leads");
          return;
        }

        console.log("Fetched leads:", data);
        setLeads(data || []);
      } catch (error) {
        console.error("Error in fetchLeads:", error);
        toast.error("Erreur lors de la récupération des leads");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return { leads, isLoading };
};