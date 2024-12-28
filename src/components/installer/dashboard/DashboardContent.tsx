import { DashboardTabs } from "./DashboardTabs";
import { StatsCards } from "./StatsCards";
import { LeadsOverview } from "./leads/LeadsOverview";
import { mockAvailableLeads } from "./mockAvailableLeads";
import { mockPurchasedLeads } from "./mockPurchasedLeads";
import { motion } from "framer-motion";

export const DashboardContent = () => {
  return (
    <div className="space-y-12 px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
          Tableau de bord
        </h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          <StatsCards />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-7xl mx-auto"
      >
        <LeadsOverview 
          availableLeads={mockAvailableLeads}
          purchasedLeads={mockPurchasedLeads}
          onShowAllAvailable={() => {}}
          onShowAllPurchased={() => {}}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        <DashboardTabs />
      </motion.div>
    </div>
  );
};