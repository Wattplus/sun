import { useState } from "react";
import { InstallerBreadcrumb } from "@/components/installer/navigation/InstallerBreadcrumb";
import { PrepaidBalanceDisplay } from "@/components/installer/dashboard/prepaid/PrepaidBalanceDisplay";
import { useInstallerBalance } from "@/hooks/installer/useInstallerBalance";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, History, RefreshCw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SavedCards } from "@/components/installer/dashboard/prepaid/SavedCards";
import { TransactionHistory } from "@/components/installer/dashboard/prepaid/TransactionHistory";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FAQSection } from "@/components/installer/dashboard/prepaid/FAQSection";
import { mockCards, mockTransactions, faqItems } from "@/components/installer/dashboard/prepaid/mockData";

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

  const handleDeleteCard = (cardId: string) => {
    console.log("Delete card:", cardId);
    toast({
      title: "Carte supprimée",
      description: "La carte a été supprimée avec succès.",
    });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const rechargeAmounts = [50, 100, 200, 500, 1000, 1500];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background-light to-background p-4 md:p-6">
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
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Card className="p-6 glass-card">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Solde disponible</h2>
                    <p className="text-3xl font-bold mt-2">{balance?.toLocaleString('fr-FR')} €</p>
                  </div>
                </div>
                
                {/* Quick Recharge Options */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                  {rechargeAmounts.map((amount) => (
                    <motion.div
                      key={amount}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        variant="outline"
                        onClick={() => handleRecharge(amount)}
                        disabled={isRecharging}
                        className={`w-full h-24 bg-white/5 hover:bg-white/10 border-primary/20 text-white group relative overflow-hidden ${
                          amount === 500 ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 group-hover:via-primary/20 transition-all duration-500" />
                        <div className="relative flex flex-col items-center justify-center gap-2">
                          <div className="flex items-center">
                            <span className="text-2xl font-bold">{amount.toLocaleString('fr-FR')}</span>
                            <span className="text-xl">€</span>
                          </div>
                          {amount === 500 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-xs px-2 py-0.5 rounded-bl-lg font-medium">
                              Populaire
                            </span>
                          )}
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <PrepaidBalanceDisplay balance={balance || 0} />
              </Card>
            </div>
          </div>

          {/* Section Cartes et Historique */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 glass-card h-full">
                <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Moyens de paiement
                </h2>
                <SavedCards
                  cards={mockCards}
                  onDeleteCard={handleDeleteCard}
                  onAddCard={() => {}}
                />
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 glass-card h-full">
                <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  Historique des transactions
                </h2>
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