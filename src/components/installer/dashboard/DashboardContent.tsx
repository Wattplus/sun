import { KPISection } from "./sections/KPISection";
import { RecentActivity } from "./sections/RecentActivity";
import { LeadsOverview } from "./sections/LeadsOverview";
import { PerformanceCharts } from "./sections/PerformanceCharts";
import { QuotesOverview } from "./sections/QuotesOverview";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function DashboardContent() {
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl backdrop-blur-sm border border-primary/10 p-6 hover:border-primary/20 transition-all duration-300"
      >
        <KPISection />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-4">
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
          <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-4">
              Activité Récente
            </h2>
            <RecentActivity />
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-4">
              Performance
            </h2>
            <PerformanceCharts />
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-4">
              Suivi des Devis
            </h2>
            <QuotesOverview />
          </Card>
        </motion.div>
      </div>
    </div>
  );
}