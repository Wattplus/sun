import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Lead } from "@/types/crm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { InstallerLayout } from "../navigation/InstallerLayout";
import { useLeadsSync } from "@/hooks/useLeadsSync";
import { LeadsList } from "../dashboard/LeadsList";
import { Card } from "@/components/ui/card";
import { BalanceSection } from "./sections/BalanceSection";
import { PricingCards } from "./sections/PricingCards";
import { BottomCTA } from "./sections/BottomCTA";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";

export const NewLeadsPage = () => {
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const { toast } = useToast();
  const balance = 150;
  const hasEnoughBalance = balance >= 26;
  const recommendedBalance = 200;
  const needsTopUp = balance < recommendedBalance;

  const handleLeadSelect = (lead: Lead) => {
    if (selectedLeads.some(l => l.id === lead.id)) {
      setSelectedLeads(selectedLeads.filter(l => l.id !== lead.id));
    } else {
      setSelectedLeads([...selectedLeads, lead]);
    }
  };

  const handlePurchase = () => {
    if (!hasEnoughBalance) {
      toast({
        title: "Solde insuffisant",
        description: "Veuillez recharger votre compte pour acheter ce lead.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Achat de lead",
      description: "Redirection vers le paiement...",
    });
  };

  const handlePrepaidAccount = () => {
    toast({
      title: "Compte prépayé",
      description: "Redirection vers la recharge du compte...",
    });
  };

  const totalPrice = selectedLeads.reduce((sum, lead) => sum + (hasEnoughBalance ? 26 : 35), 0);

  return (
    <InstallerLayout>
      <div className="max-w-6xl mx-auto space-y-6 p-4 min-h-screen">
        <InstallerBreadcrumb />
        
        <BalanceSection 
          balance={balance}
          onPrepaidAccount={handlePrepaidAccount}
        />

        {needsTopUp && (
          <Alert className="bg-primary/10 border-primary/20 text-white">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertDescription>
              Nous recommandons de maintenir un solde minimum de {recommendedBalance}€ pour ne pas manquer d'opportunités.{' '}
              <Button 
                variant="link" 
                className="text-primary p-0 h-auto font-semibold hover:text-primary/80"
                onClick={handlePrepaidAccount}
              >
                Recharger maintenant
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <PricingCards 
          hasEnoughBalance={hasEnoughBalance}
          onPurchase={handlePurchase}
        />

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
                disabled={!hasEnoughBalance}
              >
                {hasEnoughBalance ? "Acheter la sélection" : "Recharger pour acheter"}
              </Button>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockAvailableLeads.map((lead) => (
            <Card 
              key={lead.id}
              className="p-6 bg-white/5 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-200"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white">{lead.firstName} {lead.lastName}</h3>
                  <p className="text-white/60">{lead.postalCode}</p>
                </div>
                <div>
                  <p className="text-sm text-white/80">Budget: {lead.budget}€</p>
                  <p className="text-sm text-white/80">Type: {lead.projectType}</p>
                </div>
                <Button
                  onClick={() => handleLeadSelect(lead)}
                  variant={selectedLeads.some(l => l.id === lead.id) ? "secondary" : "outline"}
                  className="w-full"
                >
                  {selectedLeads.some(l => l.id === lead.id) ? "Désélectionner" : "Sélectionner"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <BottomCTA onPrepaidAccount={handlePrepaidAccount} />
      </div>
    </InstallerLayout>
  );
};