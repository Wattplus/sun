import { DashboardTabs } from "./DashboardTabs";
import { StatsCards } from "./StatsCards";
import { LeadsOverview } from "./leads/LeadsOverview";
import { mockAvailableLeads } from "./mockAvailableLeads";
import { mockPurchasedLeads } from "./mockPurchasedLeads";
import { motion } from "framer-motion";

export const DashboardContent = () => {
  return (
    <div className="space-y-8 px-2 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
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

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        <StatsCards />
      </div>

      <LeadsOverview 
        availableLeads={mockAvailableLeads}
        purchasedLeads={mockPurchasedLeads}
        onShowAllAvailable={() => {}}
        onShowAllPurchased={() => {}}
      />

      <DashboardTabs />
    </div>
  );
};