import { Activity, ArrowUpRight, FileText, LineChart, Target, TrendingUp, Users } from "lucide-react";
import StatCard from "./StatCard";
import RecentActivity from "./RecentActivity";
import { AdminNavigation } from "./AdminNavigation";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase-client";
import PerformanceChart from "./PerformanceChart";

const AdminDashboard = () => {
  const { data: leadsData } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const { data: installersData } = useQuery({
    queryKey: ['installers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('installers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  // Calculate conversion rate
  const convertedLeads = leadsData?.filter(lead => lead.status === 'converted')?.length || 0;
  const totalLeads = leadsData?.length || 0;
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0;

  // Calculate qualified leads
  const qualifiedLeads = leadsData?.filter(lead => 
    lead.status === 'qualified' || lead.status === 'converted'
  )?.length || 0;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />
      
      <main className="p-8 pt-24">
        <div className="max-w-7xl mx-auto space-y-8">
          <AdminBreadcrumb />
          
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div variants={item}>
                <StatCard
                  title="Leads Totaux"
                  value={totalLeads.toString()}
                  change={`+${leadsData?.filter(l => {
                    const date = new Date(l.created_at);
                    const now = new Date();
                    return date.getMonth() === now.getMonth();
                  })?.length || 0} ce mois`}
                  icon={Users}
                  trendIcon={TrendingUp}
                  trendColor="green"
                />
              </motion.div>
              
              <motion.div variants={item}>
                <StatCard
                  title="Installateurs"
                  value={installersData?.length.toString() || "0"}
                  change={`+${installersData?.filter(i => {
                    const date = new Date(i.created_at);
                    const now = new Date();
                    return date.getMonth() === now.getMonth();
                  })?.length || 0} ce mois`}
                  icon={FileText}
                  trendIcon={ArrowUpRight}
                  trendColor="green"
                />
              </motion.div>
              
              <motion.div variants={item}>
                <StatCard
                  title="Taux de Conversion"
                  value={`${conversionRate}%`}
                  change={`${convertedLeads} leads convertis`}
                  icon={Target}
                  trendIcon={LineChart}
                  trendColor={Number(conversionRate) > 20 ? "green" : "yellow"}
                />
              </motion.div>
              
              <motion.div variants={item}>
                <StatCard
                  title="Leads Qualifiés"
                  value={qualifiedLeads.toString()}
                  change={`${((qualifiedLeads / totalLeads) * 100).toFixed(1)}% du total`}
                  icon={Activity}
                  trendIcon={TrendingUp}
                  trendColor={qualifiedLeads > totalLeads / 4 ? "green" : "yellow"}
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div variants={item} className="bg-card rounded-xl p-6 border">
                <h2 className="text-2xl font-semibold mb-6">Performance des Leads</h2>
                <PerformanceChart data={leadsData || []} />
              </motion.div>

              <motion.div variants={item} className="bg-card rounded-xl p-6 border">
                <h2 className="text-2xl font-semibold mb-6">Activité Récente</h2>
                <RecentActivity leads={leadsData || []} installers={installersData || []} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;