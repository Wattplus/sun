import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Euro, Plus, History, CreditCard, Wallet } from "lucide-react";
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
      <div className="p-4">
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
      </div>
    </Card>
  );
};