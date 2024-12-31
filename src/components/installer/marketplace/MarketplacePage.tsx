import { Card } from "@/components/ui/card";
import { LeadsList } from "../dashboard/LeadsList";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { Lead } from "@/types/crm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { MarketplaceHeader } from "./sections/MarketplaceHeader";
import { MarketplaceBalance } from "./sections/MarketplaceBalance";
import { MarketplaceLeadsTable } from "./sections/MarketplaceLeadsTable";

export const MarketplacePage = () => {
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const { toast } = useToast();

  const handleLeadSelect = (lead: Lead) => {
    if (selectedLeads.some(l => l.id === lead.id)) {
      setSelectedLeads(selectedLeads.filter(l => l.id !== lead.id));
    } else {
      setSelectedLeads([...selectedLeads, lead]);
    }
  };

  const handlePurchaseLeads = () => {
    const total = selectedLeads.reduce((sum, lead) => sum + lead.price, 0);
    toast({
      title: "Achat de leads",
      description: `Redirection vers le paiement pour ${total}€...`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background-light">
      <div className="container mx-auto py-6 space-y-6">
        <InstallerBreadcrumb />
        
        <div className="space-y-6">
          <MarketplaceHeader availableLeads={mockAvailableLeads.length} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-background/50 backdrop-blur-sm border-primary/10">
                <MarketplaceLeadsTable 
                  leads={mockAvailableLeads}
                  onLeadSelect={handleLeadSelect}
                  selectedLeads={selectedLeads}
                />
              </Card>
            </div>
            
            <div className="space-y-6">
              <MarketplaceBalance 
                balance={150}
                onPurchase={handlePurchaseLeads}
                selectedLeads={selectedLeads}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};