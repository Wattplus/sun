import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Lead } from "@/types/crm";
import { LeadCard } from "../LeadCard";

interface MarketplaceGridProps {
  availableLeads: Lead[];
  purchasedLeads: string[];
  onPurchase: (lead: Lead) => void;
}

export const MarketplaceGrid = ({ 
  availableLeads, 
  purchasedLeads,
  onPurchase 
}: MarketplaceGridProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {availableLeads.map(lead => (
          <LeadCard 
            key={lead.id} 
            lead={lead} 
            onPurchase={onPurchase}
            status={purchasedLeads.includes(lead.id) ? "purchased" : "available"}
            showActions={!purchasedLeads.includes(lead.id)}
          />
        ))}
      </div>

      {availableLeads.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Aucun lead ne correspond à vos critères de recherche.
          </p>
        </div>
      )}

      {availableLeads.length > 0 && (
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="gap-2">
            Voir plus de leads
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};