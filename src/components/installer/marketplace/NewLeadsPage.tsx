import { Card } from "@/components/ui/card";
import { LeadsList } from "../dashboard/LeadsList";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { Lead } from "@/types/crm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { InstallerLayout } from "../navigation/InstallerLayout";

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

  const handlePurchase = () => {
    toast({
      title: "Achat de lead",
      description: "Redirection vers le paiement...",
    });
  };

  const totalPrice = selectedLeads.reduce((sum, lead) => sum + lead.price, 0);

  return (
    <InstallerLayout>
      <div className="max-w-6xl mx-auto space-y-4 p-4">
        <InstallerBreadcrumb />
        
        {/* Prix des leads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6 bg-gradient-to-br from-white/5 to-primary/5 border border-primary/10 hover:border-primary/20 transition-all duration-300">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Euro className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Lead Particulier</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary">26€</span>
                <span className="text-sm text-muted-foreground">avec compte prépayé</span>
              </div>
              <p className="text-sm text-muted-foreground">35€ sans compte prépayé</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white/5 to-primary/5 border border-primary/10 hover:border-primary/20 transition-all duration-300">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Euro className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Lead Pro</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary">49€</span>
                <span className="text-sm text-muted-foreground">avec compte prépayé</span>
              </div>
              <p className="text-sm text-muted-foreground">59€ sans compte prépayé</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white/5 to-primary/5 border border-primary/10 hover:border-primary/20 transition-all duration-300">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Lead Exclusif</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary">89€</span>
                <span className="text-sm text-muted-foreground">accès unique</span>
              </div>
              <p className="text-sm text-muted-foreground">Contactez-nous pour plus d'infos</p>
            </div>
          </Card>
        </div>

        {/* Panier de sélection */}
        {selectedLeads.length > 0 && (
          <Card className="p-6 mb-6 bg-primary/5 border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">
                  {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} sélectionné{selectedLeads.length > 1 ? 's' : ''}
                </h3>
                <p className="text-muted-foreground">Total: {totalPrice}€</p>
              </div>
              <Button 
                onClick={handlePurchase}
                className="bg-primary hover:bg-primary-dark text-white px-6"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Acheter la sélection
              </Button>
            </div>
          </Card>
        )}

        {/* Liste des leads */}
        <LeadsList
          leads={mockAvailableLeads}
          onLeadSelect={handleLeadSelect}
          selectedLeads={selectedLeads}
        />
      </div>
    </InstallerLayout>
  );
};