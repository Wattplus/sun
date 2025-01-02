import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useAffiliateStats = () => {
  return useQuery({
    queryKey: ["affiliate-stats"],
    queryFn: async () => {
      const { data: affiliates, error: affiliatesError } = await supabase
        .from("affiliates")
        .select("total_leads, total_revenue, total_commission");

      if (affiliatesError) {
        console.error("Error fetching affiliate stats:", affiliatesError);
        toast.error("Erreur lors de la récupération des statistiques");
        throw affiliatesError;
      }

      const stats = affiliates.reduce(
        (acc, curr) => ({
          totalLeads: acc.totalLeads + (curr.total_leads || 0),
          totalRevenue: acc.totalRevenue + (curr.total_revenue || 0),
          totalCommission: acc.totalCommission + (curr.total_commission || 0),
        }),
        { totalLeads: 0, totalRevenue: 0, totalCommission: 0 }
      );

      return stats;
    },
  });
};