import { useState } from "react";
import { Card } from "@/components/ui/card";
import { LeadsList } from "../dashboard/LeadsList";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { PrepaidBalance } from "../dashboard/PrepaidBalance";
import { Button } from "@/components/ui/button";
import { ShoppingCart, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
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
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto space-y-8 py-8">
        <div className="glass-panel p-8 space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="font-medium">Marketplace</span>
                </div>
                <h1 className="text-4xl font-bold gradient-text">
                  Nouveaux Leads Disponibles
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Découvrez tous les leads qualifiés disponibles pour votre région. 
                  Nos leads sont soigneusement sélectionnés et vérifiés pour assurer 
                  une qualité optimale.
                </p>
              </div>

              {selectedLeads.length > 0 && (
                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{selectedLeads.length} leads sélectionnés</p>
                    <p className="text-sm text-muted-foreground">
                      Total: {selectedLeads.reduce((sum, lead) => sum + lead.price, 0)}€
                    </p>
                  </div>
                  <Button 
                    onClick={handlePurchaseLeads}
                    className="bg-primary hover:bg-primary-dark"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Acheter les leads
                  </Button>
                </div>
              )}
            </div>

            <div className="w-full max-w-md mx-auto lg:ml-auto">
              <PrepaidBalance balance={150} />
            </div>
          </div>
        </div>

        <Card className="glass-panel p-6 animate-fadeIn">
          <LeadsList 
            leads={mockAvailableLeads} 
            onLeadSelect={handleLeadSelect}
            selectedLeads={selectedLeads}
          />
        </Card>
      </div>
    </div>
  );
};