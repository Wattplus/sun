import { useState } from "react";
import { InstallerBreadcrumb } from "@/components/installer/navigation/InstallerBreadcrumb";
import { useInstallerBalance } from "@/hooks/installer/useInstallerBalance";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { Euro, RefreshCw, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FAQSection } from "@/components/installer/dashboard/prepaid/FAQSection";
import { mockCards, mockTransactions, faqItems } from "@/components/installer/dashboard/prepaid/mockData";
import { SavedCards } from "@/components/installer/dashboard/prepaid/SavedCards";
import { TransactionHistory } from "@/components/installer/dashboard/prepaid/TransactionHistory";
import { PrepaidBalance } from "@/components/installer/dashboard/PrepaidBalance";

export const PrepaidAccountPage = () => {
  const { balance, isLoading: isBalanceLoading } = useInstallerBalance();
  const [isRecharging, setIsRecharging] = useState(false);
  const { toast } = useToast();

  const handleRecharge = async (amount: number) => {
    setIsRecharging(true);
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
      setIsRecharging(false);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <InstallerBreadcrumb />
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="text-primary border-primary/20 hover:bg-primary/10"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
        </div>

        <div className="grid gap-8">
          {/* Section Solde et Recharge Rapide */}
          <PrepaidBalance balance={balance || 0} />

          {/* Section Cartes et Historique */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 glass-card h-full">
                <SavedCards cards={mockCards} onDeleteCard={() => {}} onAddCard={() => {}} />
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 glass-card h-full">
                <TransactionHistory transactions={mockTransactions} />
              </Card>
            </motion.div>
          </div>

          {/* Section FAQ */}
          <FAQSection items={faqItems} />
        </div>
      </div>
    </div>
  );
};