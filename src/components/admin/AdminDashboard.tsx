import { Users, FileText, Target, Activity, TrendingUp, ArrowUpRight, LineChart, Award } from "lucide-react";
import StatCard from "./StatCard";
import PerformanceChart from "./PerformanceChart";
import RecentActivity from "./RecentActivity";
import { AdminNavigation } from "./AdminNavigation";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AdminDashboard = () => {
  const isMobile = useIsMobile();
  const [showMenu, setShowMenu] = useState(false);

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
      <div className="flex flex-col lg:flex-row">
        {/* Mobile Menu Button */}
        {isMobile && (
          <Button
            variant="ghost"
            className="fixed top-4 right-4 z-50"
            onClick={() => setShowMenu(!showMenu)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {showMenu ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </Button>
        )}

        {/* Sidebar */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ 
            x: 0, 
            opacity: 1,
            translateX: isMobile && !showMenu ? '-100%' : '0%'
          }}
          transition={{ duration: 0.5 }}
          className={`
            ${isMobile ? 'fixed inset-y-0 left-0 z-40' : 'sticky top-0'}
            w-64 min-h-screen bg-[#0B1221]/50 backdrop-blur-md border-r border-primary/20 p-4
          `}
        >
          <h1 className="text-xl font-bold mb-6 px-4 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Administration
          </h1>
          <AdminNavigation />
        </motion.div>
        
        {/* Main Content */}
        <div className={`flex-1 p-4 lg:p-8 ${isMobile ? 'mt-16' : ''}`}>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8"
          >
            <motion.div variants={item}>
              <StatCard
                title="Visiteurs"
                value="0"
                change="0% ce mois"
                icon={Users}
                trendIcon={TrendingUp}
                trendColor="yellow"
              />
            </motion.div>
            <motion.div variants={item}>
              <StatCard
                title="Devis générés"
                value="0"
                change="0% cette semaine"
                icon={FileText}
                trendIcon={ArrowUpRight}
                trendColor="yellow"
              />
            </motion.div>
            <motion.div variants={item}>
              <StatCard
                title="Taux de conversion"
                value="0%"
                change="0% ce mois"
                icon={Target}
                trendIcon={LineChart}
                trendColor="yellow"
              />
            </motion.div>
            <motion.div variants={item}>
              <StatCard
                title="Leads qualifiés"
                value="0"
                change="0% cette semaine"
                icon={Activity}
                trendIcon={TrendingUp}
                trendColor="yellow"
              />
            </motion.div>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          >
            <motion.div variants={item} className="glass-panel p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                Top Installateurs
              </h2>
              <div className="space-y-4">
                <div className="text-center text-white/70 py-8">
                  Aucun installateur enregistré
                </div>
              </div>
            </motion.div>
            <motion.div variants={item}>
              <PerformanceChart />
            </motion.div>
          </motion.div>

          <motion.div variants={item}>
            <RecentActivity />
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && showMenu && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;