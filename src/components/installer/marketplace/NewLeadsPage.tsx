import { useState } from "react";
import { Card } from "@/components/ui/card";
import { LeadsList } from "../dashboard/LeadsList";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { PrepaidBalance } from "../dashboard/PrepaidBalance";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Lead } from "@/types/crm";

export const NewLeadsPage = () => {
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
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-start justify-between gap-8">
        {/* Left side - Leads list */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-6">Nouveaux Leads</h1>
          
          <Card className="p-6">
            <LeadsList 
              leads={mockAvailableLeads} 
              onLeadSelect={handleLeadSelect}
              selectedLeads={selectedLeads}
            />
          </Card>
        </div>

        {/* Right side - Purchase summary */}
        <div className="w-80 space-y-6">
          <PrepaidBalance balance={150} />
          
          {selectedLeads.length > 0 && (
            <Card className="p-4 bg-primary/10 border-primary/20">
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-lg">
                    {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} sélectionné{selectedLeads.length > 1 ? 's' : ''}
                  </p>
                  <p className="text-muted-foreground">
                    Total: {selectedLeads.reduce((sum, lead) => sum + lead.price, 0)}€
                  </p>
                </div>
                <Button 
                  onClick={handlePurchaseLeads}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Acheter les leads
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};