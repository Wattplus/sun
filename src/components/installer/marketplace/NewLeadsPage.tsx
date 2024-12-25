import { Card } from "@/components/ui/card";
import { LeadsList } from "../dashboard/LeadsList";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { PrepaidBalance } from "../dashboard/PrepaidBalance";
import { Lead } from "@/types/crm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Nouveaux Leads Disponibles</h1>
        {selectedLeads.length > 0 && (
          <Button 
            onClick={handlePurchaseLeads}
            className="bg-primary hover:bg-primary/90"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Acheter {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} ({selectedLeads.reduce((sum, lead) => sum + lead.price, 0)}€)
          </Button>
        )}
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Les leads sont disponibles pendant 24h après leur qualification. Les prix varient selon le type de projet et le budget.
        </AlertDescription>
      </Alert>

      <div className="flex items-start justify-between gap-8">
        <div className="flex-1">
          <Card className="p-6">
            <LeadsList 
              leads={mockAvailableLeads} 
              onLeadSelect={handleLeadSelect}
              selectedLeads={selectedLeads}
            />
          </Card>
        </div>

        <div className="w-80 space-y-6">
          <PrepaidBalance balance={150} />
          
          {selectedLeads.length > 0 && (
            <Card className="p-4 bg-primary/10 border-primary/20">
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-lg">
                    Récapitulatif de la sélection
                  </p>
                  <div className="mt-2 space-y-2">
                    {selectedLeads.map(lead => (
                      <div key={lead.id} className="flex justify-between text-sm">
                        <span>{lead.firstName} {lead.lastName}</span>
                        <span className="font-medium">{lead.price}€</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                      <span>Total</span>
                      <span>{selectedLeads.reduce((sum, lead) => sum + lead.price, 0)}€</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};