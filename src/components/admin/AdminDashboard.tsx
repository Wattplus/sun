import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import PerformanceChart from "./PerformanceChart";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import RecentActivity from "./RecentActivity";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { Users, TrendingUp, CircleDollarSign, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
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

  return (
    <div className="space-y-6 p-6">
      <AdminBreadcrumb />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-5"
      >
        <StatCard
          title="Total Leads"
          value={totalLeads}
          icon={Users}
          trend="+12% ce mois"
          trendUp={true}
        />
        <StatCard
          title="Leads Convertis"
          value={convertedLeads}
          icon={CheckCircle}
          trend="+5% ce mois"
          trendUp={true}
        />
        <StatCard
          title="Taux de Conversion"
          value={`${conversionRate}%`}
          icon={TrendingUp}
          trend="+8% ce mois"
          trendUp={true}
        />
        <StatCard
          title="Leads Perdus"
          value={lostLeads}
          icon={XCircle}
          trend="-3% ce mois"
          trendUp={false}
        />
        <StatCard
          title="Revenu Moyen/Lead"
          value="350€"
          icon={CircleDollarSign}
          trend="+2% ce mois"
          trendUp={true}
        />
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PerformanceChart data={[]} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <RecentActivity leads={leads} installers={installers} />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;