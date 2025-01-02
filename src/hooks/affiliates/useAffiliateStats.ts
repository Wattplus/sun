import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface AffiliateStats {
  totalAffiliates: number;
  totalLeads: number;
  totalRevenue: number;
  totalCommission: number;
  activeAffiliates: number;
  conversionRate: number;
  averageCommission: number;
}

export const useAffiliateStats = () => {
  return useQuery({
    queryKey: ["affiliate-stats"],
    queryFn: async () => {
      const { count: totalAffiliates, error: countError } = await supabase
        .from("affiliates")
        .select("*", { count: 'exact', head: true });

      if (countError) {
        console.error("Error fetching affiliate count:", countError);
        toast.error("Erreur lors de la récupération du nombre d'affiliés");
        throw countError;
      }

      const { count: activeAffiliates, error: activeError } = await supabase
        .from("affiliates")
        .select("*", { count: 'exact', head: true })
        .eq('status', 'active');

      if (activeError) {
        console.error("Error fetching active affiliates:", activeError);
        toast.error("Erreur lors de la récupération des affiliés actifs");
        throw activeError;
      }

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

      const conversionRate = stats.totalLeads > 0 
        ? (stats.totalRevenue / stats.totalLeads) * 100 
        : 0;

      const averageCommission = stats.totalLeads > 0 
        ? stats.totalCommission / stats.totalLeads 
        : 0;

      return {
        ...stats,
        totalAffiliates: totalAffiliates || 0,
        activeAffiliates: activeAffiliates || 0,
        conversionRate: parseFloat(conversionRate.toFixed(2)),
        averageCommission: parseFloat(averageCommission.toFixed(2))
      };
    },
  });
};