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
        className="rounded-xl backdrop-blur-sm border border-primary/10 p-6 hover:border-primary/20 transition-all duration-300"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent mb-6 animate-gradient bg-[length:200%_auto]">
          Tableau de Bord WattPlus
        </h1>
        <KPISection />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <Card className="p-6 bg-glass-gradient backdrop-blur-sm border-primary/10 hover:bg-glass-gradient-hover hover:border-primary/20 transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Activité Récente
            </h2>
            <RecentActivity />
          </Card>
          <Card className="p-6 bg-glass-gradient backdrop-blur-sm border-primary/10 hover:bg-glass-gradient-hover hover:border-primary/20 transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Performance
            </h2>
            <PerformanceCharts />
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 h-full bg-glass-gradient backdrop-blur-sm border-primary/10 hover:bg-glass-gradient-hover hover:border-primary/20 transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Aperçu des Leads
            </h2>
            <LeadsOverview />
          </Card>
        </motion.div>
      </div>
    </div>
  );
}