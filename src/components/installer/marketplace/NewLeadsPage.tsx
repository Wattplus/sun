import { Card } from "@/components/ui/card";
import { LeadsList } from "../dashboard/LeadsList";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { Lead } from "@/types/crm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Euro, Wallet, CreditCard, Building2, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { InstallerLayout } from "../navigation/InstallerLayout";

export const NewLeadsPage = () => {
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const { toast } = useToast();
  const balance = 150;

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

  const handlePrepaidAccount = () => {
    toast({
      title: "Compte prépayé",
      description: "Redirection vers la création de compte prépayé...",
    });
  };

  const totalPrice = selectedLeads.reduce((sum, lead) => sum + lead.price, 0);

  return (
    <InstallerLayout>
      <div className="max-w-6xl mx-auto space-y-6 p-4 min-h-screen bg-secondary-dark">
        <InstallerBreadcrumb />
        
        {/* Solde disponible */}
        <Card className="relative overflow-hidden p-6 bg-white/5 backdrop-blur-sm border-primary/10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 backdrop-blur-sm">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-white/60">Solde disponible</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {balance}€
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary/20 hover:bg-primary/10 text-white"
                onClick={handlePrepaidAccount}
              >
                <Plus className="h-4 w-4 mr-2 text-primary" />
                Recharger
              </Button>
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90"
                onClick={handlePrepaidAccount}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Gérer mon compte
              </Button>
            </div>
          </div>
        </Card>

        {/* Prix des leads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Lead Particulier */}
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/10 hover:scale-105 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-medium text-white">Lead Particulier</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">26€</span>
                  <span className="text-sm text-white/60">avec compte prépayé</span>
                </div>
                <p className="text-sm text-white/60">35€ sans compte prépayé</p>
              </div>
              <Button 
                onClick={handlePurchase}
                className="w-full bg-primary hover:bg-primary/90"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Acheter
              </Button>
            </div>
          </Card>

          {/* Lead Pro */}
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/10 hover:scale-105 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-medium text-white">Lead Pro</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">49€</span>
                  <span className="text-sm text-white/60">avec compte prépayé</span>
                </div>
                <p className="text-sm text-white/60">59€ sans compte prépayé</p>
              </div>
              <Button 
                onClick={handlePurchase}
                className="w-full bg-primary hover:bg-primary/90"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Acheter
              </Button>
            </div>
          </Card>
        </div>

        {/* Panier de sélection */}
        {selectedLeads.length > 0 && (
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">
                  {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} sélectionné{selectedLeads.length > 1 ? 's' : ''}
                </h3>
                <p className="text-white/60">Total: {totalPrice}€</p>
              </div>
              <Button 
                onClick={handlePurchase}
                className="bg-primary hover:bg-primary/90 text-white px-6"
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