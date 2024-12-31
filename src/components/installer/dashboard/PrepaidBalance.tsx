import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Euro, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
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
      id="recharge-section"
    >
      <Card className="bg-[#0B1221]/90 border-primary/10 overflow-hidden">
        <div className="p-8 space-y-8">
          {/* Balance Display */}
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white/90">
                <Euro className="h-5 w-5 text-primary" />
                <span className="text-lg">Solde disponible</span>
              </div>
              <motion.div 
                className="flex items-baseline gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-6xl font-bold text-white">
                  {balance.toLocaleString('fr-FR')}
                </span>
                <span className="text-3xl text-white/80">€</span>
              </motion.div>
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
          <div className="space-y-6">
            <h4 className="text-lg text-white/90">Options de rechargement</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[50, 100, 200, 500, 1000, 1500].map((amount, index) => (
                <motion.button
                  key={amount}
                  onClick={() => handleRecharge(amount)}
                  disabled={isLoading}
                  className={`relative p-6 rounded-xl bg-[#0B1221]/80 border border-primary/10 hover:border-primary/30 
                    transition-all duration-300 hover:scale-105 ${
                    amount === 500 ? 'ring-2 ring-primary/30' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-center text-white">
                    <span className="text-2xl font-bold">{amount}</span>
                    <span className="text-2xl ml-1">€</span>
                  </div>
                  {amount === 500 && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary px-2 py-0.5 rounded text-xs font-medium text-white">
                      Populaire
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};