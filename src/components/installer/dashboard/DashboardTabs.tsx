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

export function DashboardTabs() {
  const [showAllAvailable, setShowAllAvailable] = useState(false);
  const [showAllPurchased, setShowAllPurchased] = useState(false);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCards />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <PrepaidBalance />
        </Card>
        <Card className="p-6">
          <ProjectsList />
        </Card>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Leads disponibles</h2>
          <Button
            variant="ghost"
            onClick={() => setShowAllAvailable(!showAllAvailable)}
            className="gap-2"
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
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Leads achetés</h2>
          <Button
            variant="ghost"
            onClick={() => setShowAllPurchased(!showAllPurchased)}
            className="gap-2"
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
      </div>
    </div>
  );
}