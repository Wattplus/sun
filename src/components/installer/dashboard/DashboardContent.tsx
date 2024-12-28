import { KPISection } from "./sections/KPISection";
import { RecentActivity } from "./sections/RecentActivity";
import { LeadsOverview } from "./sections/LeadsOverview";
import { PerformanceCharts } from "./sections/PerformanceCharts";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function DashboardContent() {
  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-background to-background/80">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl backdrop-blur-sm border border-[#1EAEDB]/10 p-6 hover:border-[#1EAEDB]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#1EAEDB]/5"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1EAEDB] via-[#33C3F0] to-[#0FA0CE] bg-clip-text text-transparent mb-6 animate-gradient bg-[length:200%_auto]">
          Tableau de Bord WattPlus
        </h1>
        <KPISection />
      </motion.div>

      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 bg-gradient-to-br from-[#0B1221]/50 to-[#1EAEDB]/10 backdrop-blur-sm border-[#1EAEDB]/10 hover:bg-gradient-to-br hover:from-[#0B1221]/60 hover:to-[#1EAEDB]/20 hover:border-[#1EAEDB]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#1EAEDB]/5 group">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#1EAEDB] to-[#33C3F0] bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              Aperçu des Leads
            </h2>
            <LeadsOverview />
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-6 bg-gradient-to-br from-[#0B1221]/50 to-[#1EAEDB]/10 backdrop-blur-sm border-[#1EAEDB]/10 hover:bg-gradient-to-br hover:from-[#0B1221]/60 hover:to-[#1EAEDB]/20 hover:border-[#1EAEDB]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#1EAEDB]/5 group">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#1EAEDB] to-[#33C3F0] bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              Activité Récente
            </h2>
            <RecentActivity />
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6 bg-gradient-to-br from-[#0B1221]/50 to-[#1EAEDB]/10 backdrop-blur-sm border-[#1EAEDB]/10 hover:bg-gradient-to-br hover:from-[#0B1221]/60 hover:to-[#1EAEDB]/20 hover:border-[#1EAEDB]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#1EAEDB]/5 group">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#1EAEDB] to-[#33C3F0] bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              Performance
            </h2>
            <PerformanceCharts />
          </Card>
        </motion.div>
      </div>
    </div>
  );
}