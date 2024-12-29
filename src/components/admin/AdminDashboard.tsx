import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import PerformanceChart from "./PerformanceChart";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import RecentActivity from "./RecentActivity";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { Euro, TrendingUp, Users, CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Lead } from "@/types/crm";

const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [installers, setInstallers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: leadsData, error: leadsError } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });

        if (leadsError) throw leadsError;

        const { data: installersData, error: installersError } = await supabase
          .from('installers')
          .select('*');

        if (installersError) throw installersError;

        setLeads(leadsData || []);
        setInstallers(installersData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du tableau de bord",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const totalLeads = leads.length;
  const convertedLeads = leads.filter(lead => lead.status === 'converted').length;
  const lostLeads = leads.filter(lead => lead.status === 'lost').length;
  const conversionRate = totalLeads ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0';
  
  // Assuming each lead has a value of 100€ for this example
  const leadValue = 100;
  const totalRevenue = convertedLeads * leadValue;
  const averageRevenue = totalLeads ? (totalRevenue / totalLeads).toFixed(2) : '0';

  return (
    <div className="space-y-6 p-6">
      <AdminBreadcrumb />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Leads"
          value={totalLeads.toString()}
          icon={Users}
          trend="+12%"
          trendUp={true}
        />
        <StatCard
          title="Leads Convertis"
          value={convertedLeads.toString()}
          icon={CheckCircle}
          trend="+5%"
          trendUp={true}
        />
        <StatCard
          title="Chiffre d'Affaires"
          value={`${totalRevenue}€`}
          icon={Euro}
          trend="+8%"
          trendUp={true}
        />
        <StatCard
          title="Leads Perdus"
          value={lostLeads.toString()}
          icon={XCircle}
          trend="-3%"
          trendUp={false}
        />
        <StatCard
          title="Revenu Moyen/Lead"
          value={`${averageRevenue}€`}
          icon={TrendingUp}
          trend="+2%"
          trendUp={true}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <PerformanceChart data={[]} />
        <Card className="p-6">
          <RecentActivity leads={leads} installers={installers} />
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;