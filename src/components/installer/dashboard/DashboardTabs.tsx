import { Card } from "@/components/ui/card";
import { PrepaidBalance } from "./PrepaidBalance";
import { StatsCards } from "./StatsCards";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { mockAvailableLeads } from "./mockAvailableLeads";
import { mockPurchasedLeads } from "./mockPurchasedLeads";
import { motion } from "framer-motion";
import { LeadsOverview } from "./leads/LeadsOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DashboardTabs() {
  const [activeSection, setActiveSection] = useState<'overview' | 'available' | 'purchased'>('overview');

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8"
      >
        <StatsCards />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="p-6 glass-panel border-2 border-primary/20 hover:border-primary/30 transition-all duration-300">
          <PrepaidBalance />
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-background/50 backdrop-blur-sm">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="available">Leads disponibles</TabsTrigger>
            <TabsTrigger value="purchased">Leads achetés</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <LeadsOverview 
              availableLeads={mockAvailableLeads.slice(0, 4)}
              purchasedLeads={mockPurchasedLeads.slice(0, 4)}
              onShowAllAvailable={() => setActiveSection('available')}
              onShowAllPurchased={() => setActiveSection('purchased')}
            />
          </TabsContent>
          <TabsContent value="available">
            <LeadsOverview 
              availableLeads={mockAvailableLeads}
              purchasedLeads={[]}
              onShowAllAvailable={() => {}}
              onShowAllPurchased={() => {}}
            />
          </TabsContent>
          <TabsContent value="purchased">
            <LeadsOverview 
              availableLeads={[]}
              purchasedLeads={mockPurchasedLeads}
              onShowAllAvailable={() => {}}
              onShowAllPurchased={() => {}}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}