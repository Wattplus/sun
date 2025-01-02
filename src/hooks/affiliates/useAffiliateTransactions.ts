import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useAffiliateTransactions = () => {
  return useQuery({
    queryKey: ["affiliate-transactions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("affiliate_transactions")
        .select("*, affiliates(company_name, contact_name)")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching transactions:", error);
        toast.error("Erreur lors de la récupération des transactions");
        throw error;
      }

      return data;
    },
  });
};