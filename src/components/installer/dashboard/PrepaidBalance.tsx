import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Euro, Plus, History, CreditCard, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { CustomAmountInput } from "./prepaid/CustomAmountInput";
import { QuickTopUpButtons } from "./prepaid/QuickTopUpButtons";
import { SavedCards } from "./prepaid/SavedCards";

interface PrepaidBalanceProps {
  balance?: number;
}

export const PrepaidBalance = ({ balance = 0 }: PrepaidBalanceProps) => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-gradient-to-br from-[#0B1221] to-[#1A1F2C] backdrop-blur-lg border-[#1EAEDB]/20">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white/90">Options de paiement</h3>
              <p className="text-sm text-white/60">
                Choisissez votre mode de paiement préféré
              </p>
            </div>
            <motion.div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <Euro className="h-6 w-6 text-[#1EAEDB]" />
                <p className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {balance}
                </p>
              </div>
              <p className="text-sm text-white/60 mt-1">
                Solde prépayé
              </p>
            </motion.div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {/* Option 1: Paiement direct par carte */}
              <div className="p-4 rounded-lg bg-[#1EAEDB]/10 border border-[#1EAEDB]/20">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="h-5 w-5 text-[#1EAEDB]" />
                  <h4 className="font-medium text-white">Paiement direct par carte</h4>
                </div>
                <p className="text-sm text-white/60 mb-3">
                  Payez directement avec votre carte bancaire lors de l'achat d'un lead
                </p>
                <SavedCards 
                  cards={[]}
                  onDeleteCard={() => {}}
                  onAddCard={() => {}}
                />
              </div>

              {/* Option 2: Solde prépayé */}
              <div className="p-4 rounded-lg bg-[#1EAEDB]/10 border border-[#1EAEDB]/20">
                <div className="flex items-center gap-3 mb-3">
                  <Wallet className="h-5 w-5 text-[#1EAEDB]" />
                  <h4 className="font-medium text-white">Recharger mon solde prépayé</h4>
                </div>
                <p className="text-sm text-white/60 mb-3">
                  Rechargez votre compte pour des achats plus rapides
                </p>
                <div className="space-y-3">
                  <QuickTopUpButtons onTopUp={handleRecharge} isLoading={false} />
                  <CustomAmountInput 
                    value=""
                    onChange={() => {}}
                    onSubmit={() => handleRecharge(0)}
                    isLoading={false}
                  />
                </div>
              </div>
            </div>

            <Button 
              variant="outline" 
              onClick={handleHistory} 
              className="flex items-center gap-2 w-full justify-center bg-[#1EAEDB]/10 hover:bg-[#1EAEDB]/20 border-[#1EAEDB]/20"
            >
              <History className="h-4 w-4" />
              Historique des transactions
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};