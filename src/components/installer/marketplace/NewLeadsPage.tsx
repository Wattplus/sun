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

export const NewLeadsPage = () => {
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const { toast } = useToast();
  const { leads, isLoading } = useLeadsSync();
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

  if (isLoading) {
    return (
      <InstallerLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </InstallerLayout>
    );
  }

  return (
    <InstallerLayout>
      <div className="max-w-6xl mx-auto space-y-6 p-4 min-h-screen bg-secondary-dark">
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

        <LeadsList
          leads={leads}
          onLeadSelect={handleLeadSelect}
          selectedLeads={selectedLeads}
        />

        <BottomCTA onPrepaidAccount={handlePrepaidAccount} />
      </div>
    </InstallerLayout>
  );
};