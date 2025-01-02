import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useAffiliatesData = () => {
  return useQuery({
    queryKey: ["affiliates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("affiliates")
        .select("*, affiliate_transactions(*)");

      if (error) {
        console.error("Error fetching affiliates:", error);
        toast.error("Erreur lors de la récupération des affiliés");
        throw error;
      }

      return data;
    },
  });
};