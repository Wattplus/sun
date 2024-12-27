import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Euro, Plus, History, CreditCard, Wallet, User, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CustomAmountInput } from "../../dashboard/prepaid/CustomAmountInput";
import { QuickTopUpButtons } from "../../dashboard/prepaid/QuickTopUpButtons";

export const PrepaidSection = () => {
  const { toast } = useToast();

  const handleRecharge = (amount: number) => {
    toast({
      title: "Rechargement",
      description: `Redirection vers la page de paiement pour ${amount}€...`,
    });
  };

  return (
    <Card className="mb-6 bg-gradient-to-br from-background via-background/95 to-background border-primary/20">
      <div className="p-4 space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Balance */}
          <div className="flex items-center gap-2 mr-6">
            <Euro className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold text-white">150</span>
            <span className="text-sm text-white/60">Solde prépayé</span>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 flex-1">
            <Button variant="outline" size="sm" className="gap-1">
              <CreditCard className="h-4 w-4" />
              Paiement direct
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Wallet className="h-4 w-4" />
              Recharger
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleRecharge(50)}>50€</Button>
              <Button variant="outline" size="sm" onClick={() => handleRecharge(100)}>100€</Button>
              <Button variant="outline" size="sm" onClick={() => handleRecharge(200)}>200€</Button>
            </div>
          </div>
        </div>

        {/* Tarifs des leads en horizontal */}
        <div className="pt-4 border-t border-primary/10">
          <h3 className="text-sm font-medium text-primary/80 mb-4">Tarifs des leads</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Lead Particulier - Compte prépayé */}
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 hover:bg-primary/10 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-primary to-primary-light p-2 rounded-full">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Lead particulier</p>
                    <p className="text-xs text-primary-foreground/60">Compte prépayé</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-primary">26€</span>
              </div>
            </div>

            {/* Lead Particulier - Sans compte prépayé */}
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 hover:bg-primary/10 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-primary to-primary-light p-2 rounded-full">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Lead particulier</p>
                    <p className="text-xs text-primary-foreground/60">Sans compte prépayé</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-primary">35€</span>
              </div>
            </div>

            {/* Lead Professionnel */}
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 hover:bg-primary/10 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-primary to-primary-light p-2 rounded-full">
                    <Building2 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Lead professionnel</p>
                    <p className="text-xs text-primary-foreground/60">Tous comptes</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-primary">59€</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};