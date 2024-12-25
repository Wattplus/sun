import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Euro, Plus, History, TrendingDown, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface PrepaidBalanceProps {
  balance: number;
}

export const PrepaidBalance = ({ balance }: PrepaidBalanceProps) => {
  const { toast } = useToast();
  const lowBalanceThreshold = 50;
  const recommendedBalance = 200;
  const isLowBalance = balance <= lowBalanceThreshold;

  const handleRecharge = () => {
    toast({
      title: "Rechargement",
      description: "Redirection vers la page de paiement...",
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
      <Card className="overflow-hidden bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-lg border-primary/20">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white/90">Solde prépayé</h3>
              <p className="text-sm text-white/60">
                Utilisé pour l'achat automatique de leads
              </p>
            </div>
            <motion.div 
              className="text-right"
              animate={{ scale: isLowBalance ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 0.5, repeat: isLowBalance ? Infinity : 0, repeatDelay: 2 }}
            >
              <div className="flex items-center gap-2 justify-end">
                <Euro className="h-6 w-6 text-primary" />
                <p className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {balance}
                </p>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {isLowBalance && <TrendingDown className="h-4 w-4 text-red-400" />}
                <p className={`text-sm ${isLowBalance ? 'text-red-400' : 'text-white/60'}`}>
                  Seuil bas: {lowBalanceThreshold}€
                </p>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleRecharge} className="flex items-center gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Recharger
            </Button>
            <Button variant="outline" onClick={handleHistory} className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Historique
            </Button>
          </div>

          {balance < recommendedBalance && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="relative overflow-hidden"
            >
              <div className="flex gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                <p className="text-sm text-yellow-500">
                  Conseil: Maintenez un solde minimum de {recommendedBalance}€ pour ne pas manquer d'opportunités
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};