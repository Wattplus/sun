import { Card } from "@/components/ui/card";
import { PrepaidBalance } from "./PrepaidBalance";
import { StatsCards } from "./StatsCards";
import { ProjectsList } from "./ProjectsList";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { mockAvailableLeads } from "./mockAvailableLeads";
import { mockPurchasedLeads } from "./mockPurchasedLeads";
import { LeadsOverview } from "./leads/LeadsOverview";
import { AllPurchasedLeads } from "./leads/AllPurchasedLeads";
import { AllAvailableLeads } from "./leads/AllAvailableLeads";
import { motion } from "framer-motion";

export function DashboardTabs() {
  const [showAllAvailable, setShowAllAvailable] = useState(false);
  const [showAllPurchased, setShowAllPurchased] = useState(false);

  return (
    <div className="space-y-8 sm:space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <StatsCards />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid gap-6 md:grid-cols-2"
      >
        <Card className="p-6 glass-panel border-2 border-primary/20 hover:border-primary/30 transition-all duration-300">
          <PrepaidBalance />
        </Card>
        <Card className="p-6 glass-panel border-2 border-primary/20 hover:border-primary/30 transition-all duration-300">
          <ProjectsList />
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Leads disponibles
          </h2>
          <Button
            variant="ghost"
            onClick={() => setShowAllAvailable(!showAllAvailable)}
            className="gap-2 hover:bg-primary/10"
          >
            {showAllAvailable ? "Voir moins" : "Voir tout"}
            <ChevronRight className={`h-4 w-4 transition-transform ${showAllAvailable ? "rotate-90" : ""}`} />
          </Button>
        </div>
        {showAllAvailable ? (
          <AllAvailableLeads 
            leads={mockAvailableLeads} 
            onClose={() => setShowAllAvailable(false)}
          />
        ) : (
          <LeadsOverview 
            availableLeads={mockAvailableLeads.slice(0, 4)}
            purchasedLeads={mockPurchasedLeads.slice(0, 4)}
            onShowAllAvailable={() => setShowAllAvailable(true)}
            onShowAllPurchased={() => setShowAllPurchased(true)}
          />
        )}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Leads achetés
          </h2>
          <Button
            variant="ghost"
            onClick={() => setShowAllPurchased(!showAllPurchased)}
            className="gap-2 hover:bg-primary/10"
          >
            {showAllPurchased ? "Voir moins" : "Voir tout"}
            <ChevronRight className={`h-4 w-4 transition-transform ${showAllPurchased ? "rotate-90" : ""}`} />
          </Button>
        </div>
        {showAllPurchased ? (
          <AllPurchasedLeads 
            leads={mockPurchasedLeads} 
            onClose={() => setShowAllPurchased(false)}
          />
        ) : (
          <LeadsOverview 
            availableLeads={mockAvailableLeads.slice(0, 4)}
            purchasedLeads={mockPurchasedLeads.slice(0, 4)}
            onShowAllAvailable={() => setShowAllAvailable(true)}
            onShowAllPurchased={() => setShowAllPurchased(true)}
          />
        )}
      </motion.div>
    </div>
  );
}