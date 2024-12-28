import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Euro, Plus, History, CreditCard, Wallet, Shield, Award, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { CustomAmountInput } from "./prepaid/CustomAmountInput";
import { QuickTopUpButtons } from "./prepaid/QuickTopUpButtons";
import { SavedCards } from "./prepaid/SavedCards";
import { useNavigate } from "react-router-dom";

interface PrepaidBalanceProps {
  balance?: number;
}

export const PrepaidBalance = ({ balance = 0 }: PrepaidBalanceProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRecharge = (amount: number) => {
    toast({
      title: "Rechargement",
      description: `Redirection vers la page de paiement pour ${amount}€...`,
    });
    navigate("/espace-installateur/paiement/recharge", { state: { amount } });
  };

  const handleHistory = () => {
    toast({
      title: "Historique",
      description: "Affichage de l'historique des transactions...",
    });
    navigate("/espace-installateur/compte/historique-transactions");
  };

  const handleCustomAmount = (amount: string) => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      handleRecharge(numAmount);
    } else {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un montant valide",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full px-2 sm:px-0"
    >
      <Card className="overflow-hidden bg-gradient-to-br from-[#0B1221] to-[#1A1F2C] backdrop-blur-lg border-[#1EAEDB]/20">
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1 w-full sm:w-auto">
              <h3 className="text-lg font-semibold text-white/90">
                Votre compte prépayé premium
              </h3>
              <p className="text-sm text-white/60">
                Accédez aux meilleurs leads photovoltaïques en priorité
              </p>
            </div>
            <motion.div 
              className="text-right w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-2 justify-end">
                <Euro className="h-6 w-6 text-[#1EAEDB]" />
                <p className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {balance}
                </p>
              </div>
              <p className="text-sm text-white/60 mt-1">
                Solde disponible
              </p>
            </motion.div>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <motion.div 
              className="p-4 rounded-lg bg-[#1EAEDB]/10 border border-[#1EAEDB]/20"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Award className="h-8 w-8 text-[#1EAEDB] mb-2" />
              <h4 className="font-medium text-white mb-1">Accès Premium</h4>
              <p className="text-sm text-white/60">
                Priorité sur les nouveaux leads qualifiés
              </p>
            </motion.div>
            <motion.div 
              className="p-4 rounded-lg bg-[#1EAEDB]/10 border border-[#1EAEDB]/20"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <TrendingUp className="h-8 w-8 text-[#1EAEDB] mb-2" />
              <h4 className="font-medium text-white mb-1">Tarifs Préférentiels</h4>
              <p className="text-sm text-white/60">
                Jusqu'à -25% sur les leads premium
              </p>
            </motion.div>
            <motion.div 
              className="p-4 rounded-lg bg-[#1EAEDB]/10 border border-[#1EAEDB]/20"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Shield className="h-8 w-8 text-[#1EAEDB] mb-2" />
              <h4 className="font-medium text-white mb-1">Garantie Qualité</h4>
              <p className="text-sm text-white/60">
                Leads vérifiés et garantis
              </p>
            </motion.div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {/* Payment Options */}
              <div className="p-4 rounded-lg bg-[#1EAEDB]/10 border border-[#1EAEDB]/20">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="h-5 w-5 text-[#1EAEDB]" />
                  <h4 className="font-medium text-white">Paiement à l'unité</h4>
                </div>
                <p className="text-sm text-white/60 mb-3">
                  Payez directement lors de l'achat d'un contact client intéressé par une installation photovoltaïque
                </p>
                <SavedCards 
                  cards={[]}
                  onDeleteCard={(id: string) => {
                    toast({
                      title: "Carte supprimée",
                      description: "Votre carte a été supprimée avec succès",
                    });
                  }}
                />
              </div>

              {/* Prepaid Account */}
              <div className="p-4 rounded-lg bg-[#1EAEDB]/10 border border-[#1EAEDB]/20">
                <div className="flex items-center gap-3 mb-3">
                  <Wallet className="h-5 w-5 text-[#1EAEDB]" />
                  <h4 className="font-medium text-white">Compte prépayé pour vos leads</h4>
                </div>
                <p className="text-sm text-white/60 mb-3">
                  Créditez votre compte pour accéder rapidement aux contacts qualifiés en photovoltaïque
                </p>
                <div className="space-y-3">
                  <QuickTopUpButtons onTopUp={handleRecharge} isLoading={false} />
                  <CustomAmountInput 
                    value=""
                    onChange={() => {}}
                    onSubmit={handleCustomAmount}
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
              Historique des achats de leads
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};