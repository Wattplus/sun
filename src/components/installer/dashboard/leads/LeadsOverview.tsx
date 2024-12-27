import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { LeadsList } from "../LeadsList";
import { PurchasedLeads } from "../PurchasedLeads";
import { Lead } from "@/types/crm";

interface LeadsOverviewProps {
  availableLeads: Lead[];
  purchasedLeads: Lead[];
  onShowAllAvailable: () => void;
  onShowAllPurchased: () => void;
}

export const LeadsOverview = ({
  availableLeads,
  purchasedLeads,
  onShowAllAvailable,
  onShowAllPurchased,
}: LeadsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="p-8 glass-panel border-2 border-primary/20 hover:border-primary/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Nouveaux Leads Disponibles
          </h2>
          <Button 
            variant="default"
            onClick={onShowAllAvailable}
            className="gap-2 bg-primary hover:bg-primary-light text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            Voir tout
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <LeadsList leads={availableLeads.slice(0, 2)} />
      </Card>

      <Card className="p-8 glass-panel">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Mes Leads Achetés
          </h2>
          <Button 
            variant="default"
            onClick={onShowAllPurchased}
            className="gap-2 bg-primary hover:bg-primary-light text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            Voir tout
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <PurchasedLeads leads={purchasedLeads.slice(0, 2)} />
      </Card>
    </div>
  );
};