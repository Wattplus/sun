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

export const DashboardTabs = () => {
  const [showAllPurchasedLeads, setShowAllPurchasedLeads] = useState(false);
  const [showAllAvailableLeads, setShowAllAvailableLeads] = useState(false);

  if (showAllPurchasedLeads) {
    return (
      <AllPurchasedLeads
        leads={mockPurchasedLeads}
        onClose={() => setShowAllPurchasedLeads(false)}
      />
    );
  }

  if (showAllAvailableLeads) {
    return (
      <AllAvailableLeads
        leads={mockAvailableLeads}
        onClose={() => setShowAllAvailableLeads(false)}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6">
        <StatsCards />
      </div>

      <PrepaidBalance balance={150} />
      
      <Button
        size="lg"
        onClick={() => setShowAllAvailableLeads(true)}
        className="w-full py-8 text-lg font-semibold bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white shadow-lg transition-all duration-300 hover:scale-[1.02] group"
      >
        <span className="flex items-center justify-center gap-3">
          Voir tous les leads disponibles
          <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
        </span>
      </Button>
      
      <LeadsOverview
        availableLeads={mockAvailableLeads}
        purchasedLeads={mockPurchasedLeads}
        onShowAllAvailable={() => setShowAllAvailableLeads(true)}
        onShowAllPurchased={() => setShowAllPurchasedLeads(true)}
      />

      <Card className="p-6">
        <ProjectsList />
      </Card>
    </div>
  );
};