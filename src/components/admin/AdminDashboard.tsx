import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import StatCard from "./StatCard";
import PerformanceChart from "./PerformanceChart";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { RecentActivity } from "./RecentActivity";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { Euro, TrendingUp, Users, CheckCircle, XCircle } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    convertedLeads: 0,
    lostLeads: 0,
    totalRevenue: 0,
    averageRevenue: 0,
  });
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log("Fetching stats...");
        const { data: leads, error } = await supabase
          .from("leads")
          .select("*");

        if (error) {
          console.error("Error fetching leads:", error);
          toast({
            title: "Erreur",
            description: "Impossible de charger les statistiques",
            variant: "destructive" as const,
          });
          return;
        }

        const totalLeads = leads?.length || 0;
        const convertedLeads = leads?.filter(lead => lead.status === "converted").length || 0;
        const lostLeads = leads?.filter(lead => lead.status === "lost").length || 0;
        
        // Calculate revenue (assuming each lead has a price field)
        const totalRevenue = leads?.reduce((sum, lead) => sum + (lead.price || 0), 0) || 0;
        const averageRevenue = totalLeads > 0 ? totalRevenue / totalLeads : 0;

        setStats({
          totalLeads,
          convertedLeads,
          lostLeads,
          totalRevenue,
          averageRevenue,
        });

        console.log("Stats fetched successfully:", { totalLeads, convertedLeads, lostLeads, totalRevenue, averageRevenue });
      } catch (error) {
        console.error("Unexpected error fetching stats:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors du chargement des statistiques",
          variant: "destructive" as const,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const trendIcon = TrendingUp;
  const trendColor = stats.convertedLeads > stats.lostLeads ? "green" : "red";

  return (
    <div className="space-y-6 p-6">
      <AdminBreadcrumb />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total des Leads"
          value={stats.totalLeads.toString()}
          change={`${((stats.convertedLeads / stats.totalLeads) * 100).toFixed(1)}% de conversion`}
          icon={Users}
          trendIcon={trendIcon}
          trendColor={trendColor}
        />
        
        <StatCard
          title="Leads Convertis"
          value={stats.convertedLeads.toString()}
          change={`${((stats.convertedLeads / stats.totalLeads) * 100).toFixed(1)}% du total`}
          icon={CheckCircle}
          trendIcon={trendIcon}
          trendColor="green"
        />
        
        <StatCard
          title="Revenu Total"
          value={`${stats.totalRevenue.toLocaleString()}€`}
          change={`${stats.averageRevenue.toFixed(0)}€ par lead`}
          icon={Euro}
          trendIcon={trendIcon}
          trendColor="green"
        />
        
        <StatCard
          title="Leads Perdus"
          value={stats.lostLeads.toString()}
          change={`${((stats.lostLeads / stats.totalLeads) * 100).toFixed(1)}% du total`}
          icon={XCircle}
          trendIcon={trendIcon}
          trendColor="red"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <PerformanceChart data={[]} />
        <Card className="p-6">
          <RecentActivity />
        </Card>
      </div>
    </div>
  );
}