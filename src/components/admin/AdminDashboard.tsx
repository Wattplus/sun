import { Users, FileText, Target, Activity, TrendingUp, ArrowUpRight, LineChart } from "lucide-react";
import StatCard from "./StatCard";
import PerformanceChart from "./PerformanceChart";
import RecentActivity from "./RecentActivity";
import { AdminNavigation } from "./AdminNavigation";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { motion } from "framer-motion";

const AdminDashboard = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-[#0B1221] to-[#1a5fb4]">
      <div className="flex">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-64 min-h-screen bg-[#0B1221]/50 backdrop-blur-md border-r border-primary/20 p-4"
        >
          <h1 className="text-xl font-bold mb-6 px-4 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Administration
          </h1>
          <AdminNavigation />
        </motion.div>
        
        <div className="flex-1 p-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AdminBreadcrumb />
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <motion.div variants={item}>
              <StatCard
                title="Visiteurs"
                value="2,543"
                change="+15% ce mois"
                icon={Users}
                trendIcon={TrendingUp}
                trendColor="green"
              />
            </motion.div>
            <motion.div variants={item}>
              <StatCard
                title="Devis générés"
                value="384"
                change="+12% cette semaine"
                icon={FileText}
                trendIcon={ArrowUpRight}
                trendColor="green"
              />
            </motion.div>
            <motion.div variants={item}>
              <StatCard
                title="Taux de conversion"
                value="15.1%"
                change="+3% ce mois"
                icon={Target}
                trendIcon={LineChart}
                trendColor="green"
              />
            </motion.div>
            <motion.div variants={item}>
              <StatCard
                title="Leads qualifiés"
                value="156"
                change="+18% cette semaine"
                icon={Activity}
                trendIcon={TrendingUp}
                trendColor="green"
              />
            </motion.div>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          >
            <motion.div variants={item}>
              <PerformanceChart />
            </motion.div>
            <motion.div variants={item}>
              <RecentActivity />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;