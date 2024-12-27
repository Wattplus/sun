import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Euro, Plus, History, CreditCard, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { CustomAmountInput } from "../../dashboard/prepaid/CustomAmountInput";
import { QuickTopUpButtons } from "../../dashboard/prepaid/QuickTopUpButtons";
import { SavedCards } from "../../dashboard/prepaid/SavedCards";

export const PrepaidSection = () => {
  const { toast } = useToast();

  const handleRecharge = (amount: number) => {
    toast({
      title: "Rechargement",
      description: `Redirection vers la page de paiement pour ${amount}€...`,
    });
  };

  const handleHistory = () => {
    toast({
      title: "Historique",
      description: "Affichage de l'historique des transactions...",
    });
  };

  return (
    <Card className="bg-gradient-to-br from-background via-background/95 to-background border-primary/20">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold">Options de paiement</h3>
            <p className="text-sm text-muted-foreground">
              Choisissez votre mode de paiement préféré
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <Euro className="h-6 w-6 text-primary" />
              <p className="text-3xl font-bold">150</p>
            </div>
            <p className="text-sm text-muted-foreground">Solde prépayé</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Option 1: Paiement direct */}
          <div className="space-y-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Paiement direct par carte</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Payez directement avec votre carte bancaire lors de l'achat d'un lead
            </p>
            <SavedCards 
              cards={[]}
              onDeleteCard={() => {}}
              onAddCard={() => {}}
            />
          </div>

          {/* Option 2: Recharge prépayée */}
          <div className="space-y-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Recharger mon solde prépayé</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Rechargez votre compte pour des achats plus rapides
            </p>
            <div className="grid grid-cols-3 gap-2">
              <QuickTopUpButtons onTopUp={handleRecharge} isLoading={false} />
            </div>
            <CustomAmountInput 
              value=""
              onChange={() => {}}
              onSubmit={() => handleRecharge(0)}
              isLoading={false}
            />
          </div>
        </div>

        <div className="mt-4">
          <Button 
            variant="outline" 
            onClick={handleHistory}
            className="w-full flex items-center justify-center gap-2 bg-primary/5 hover:bg-primary/10 border-primary/20"
          >
            <History className="h-4 w-4" />
            Historique des transactions
          </Button>
        </div>
      </div>
    </Card>
  );
};