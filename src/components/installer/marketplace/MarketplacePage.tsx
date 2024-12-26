import { Card } from "@/components/ui/card";
import { LeadsList } from "../dashboard/LeadsList";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { PrepaidBalance } from "../dashboard/PrepaidBalance";
import { Lead } from "@/types/crm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Sparkles, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";

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
    <div className="container mx-auto py-6 space-y-6">
      <InstallerBreadcrumb />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            Marketplace des Leads
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {mockAvailableLeads.length} leads disponibles
            </Badge>
          </h1>
          <p className="text-muted-foreground mt-1">
            Découvrez tous les leads disponibles sur la plateforme
          </p>
        </div>
        {selectedLeads.length > 0 && (
          <Button 
            onClick={handlePurchaseLeads}
            className="bg-primary hover:bg-primary/90 text-lg px-6"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Acheter {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} ({selectedLeads.reduce((sum, lead) => sum + lead.price, 0)}€)
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium">Tous les leads disponibles</h2>
            </div>
            <LeadsList 
              leads={mockAvailableLeads} 
              onLeadSelect={handleLeadSelect}
              selectedLeads={selectedLeads}
            />
          </div>
        </Card>

        <div className="space-y-6">
          <PrepaidBalance balance={150} />
          
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Info className="h-5 w-5" />
                <h3 className="font-medium">Pourquoi acheter ces leads ?</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Badge variant="secondary" className="h-6 w-6 rounded-full p-1">1</Badge>
                  Leads qualifiés et vérifiés
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="secondary" className="h-6 w-6 rounded-full p-1">2</Badge>
                  Projets à fort potentiel
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="secondary" className="h-6 w-6 rounded-full p-1">3</Badge>
                  Contact rapide recommandé
                </li>
              </ul>
              <Button className="w-full gap-2" size="lg">
                Recharger mon compte
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          {selectedLeads.length > 0 && (
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Récapitulatif de la sélection
                </h3>
                <div className="space-y-2">
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
                <Button 
                  onClick={handlePurchaseLeads}
                  className="w-full"
                  size="lg"
                >
                  Procéder au paiement
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};