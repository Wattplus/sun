import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Plus, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { CustomAmountInput } from "./prepaid/CustomAmountInput";
import { QuickTopUpButtons } from "./prepaid/QuickTopUpButtons";
import { SavedCards } from "./prepaid/SavedCards";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/lib/supabase-client";

interface PrepaidBalanceProps {
  balance?: number;
}

export const PrepaidBalance = ({ balance = 0 }: PrepaidBalanceProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleRecharge = async (amount: number) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-prepaid-checkout', {
        body: { amount },
      });

      if (error) throw error;
      if (!data?.url) throw new Error('No checkout URL received');

      window.location.href = data.url;
      
      toast({
        title: "Rechargement",
        description: `Redirection vers la page de paiement pour ${amount.toLocaleString('fr-FR')}€...`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la redirection",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="overflow-hidden bg-gradient-to-br from-background to-background-light border-primary/20">
        <div className="p-6 space-y-6">
          {/* Balance Display */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white/90 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Solde disponible
              </h3>
              <motion.p 
                className="text-4xl font-bold text-white"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {balance.toLocaleString('fr-FR')}€
              </motion.p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-primary border-primary/20 hover:bg-primary/10"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
          </div>

          {/* Quick Top-up Options */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white/60">Recharger rapidement</h4>
            <QuickTopUpButtons onTopUp={handleRecharge} isLoading={isLoading} />
          </div>

          {/* Custom Amount Input */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white/60">Montant personnalisé</h4>
            <CustomAmountInput 
              value=""
              onChange={() => {}}
              onSubmit={() => handleRecharge(0)}
              isLoading={isLoading}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};