import { Card } from "@/components/ui/card";
import { LeadsList } from "../dashboard/LeadsList";
import { Lead } from "@/types/crm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Euro, Wallet, CreditCard, Building2, User, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { InstallerLayout } from "../navigation/InstallerLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLeadsSync } from "@/hooks/useLeadsSync";

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
                  <span className="text-3xl font-bold text-primary">{hasEnoughBalance ? '26' : '35'}€</span>
                  <span className="text-sm text-white/60">{hasEnoughBalance ? 'avec compte prépayé' : 'prix standard'}</span>
                </div>
                {!hasEnoughBalance && (
                  <p className="text-sm text-primary/80">Économisez en rechargeant votre compte !</p>
                )}
              </div>
              <Button 
                onClick={handlePurchase}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!hasEnoughBalance}
              >
                {hasEnoughBalance ? (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Acheter
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Recharger pour acheter
                  </>
                )}
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
                  <span className="text-3xl font-bold text-primary">{hasEnoughBalance ? '49' : '59'}€</span>
                  <span className="text-sm text-white/60">{hasEnoughBalance ? 'avec compte prépayé' : 'prix standard'}</span>
                </div>
                {!hasEnoughBalance && (
                  <p className="text-sm text-primary/80">Économisez en rechargeant votre compte !</p>
                )}
              </div>
              <Button 
                onClick={handlePurchase}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!hasEnoughBalance}
              >
                {hasEnoughBalance ? (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Acheter
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Recharger pour acheter
                  </>
                )}
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
                disabled={!hasEnoughBalance}
              >
                {hasEnoughBalance ? (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Acheter la sélection
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-5 w-5" />
                    Recharger pour acheter
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {/* Liste des leads */}
        <LeadsList
          leads={leads}
          onLeadSelect={handleLeadSelect}
          selectedLeads={selectedLeads}
        />
      </div>
    </InstallerLayout>
  );
};