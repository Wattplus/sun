import { Card } from "@/components/ui/card";
import { PrepaidBalance } from "./PrepaidBalance";
import { StatsCards } from "./StatsCards";
import { useState } from "react";
import { motion } from "framer-motion";
import { LeadsOverview } from "./leads/LeadsOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLeadOperations } from "@/hooks/useLeadOperations";
import { Lead } from "@/types/crm";

interface LeadsOverviewProps {
  availableLeads: Lead[];
  purchasedLeads: Lead[];
  onShowAllAvailable: () => void;
  onShowAllPurchased: () => void;
}

export function DashboardTabs({ leads }: { leads: Lead[] }) {
  const [activeSection, setActiveSection] = useState<'overview' | 'available' | 'purchased'>('overview');

  // Filter leads based on their status
  const availableLeads = leads.filter(lead => !lead.purchasedby?.length);
  const purchasedLeads = leads.filter(lead => lead.purchasedby?.length);

  console.log("[DashboardTabs] Available leads:", availableLeads.length);
  console.log("[DashboardTabs] Purchased leads:", purchasedLeads.length);

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-6 grid-cols-1 md:grid-cols-2"
      >
        <StatsCards />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="p-6 glass-panel">
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
            <LeadsOverview />
          </TabsContent>
          <TabsContent value="available">
            <LeadsOverview />
          </TabsContent>
          <TabsContent value="purchased">
            <LeadsOverview />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}