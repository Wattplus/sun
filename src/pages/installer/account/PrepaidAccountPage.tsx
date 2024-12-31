import { useState } from "react";
import { InstallerBreadcrumb } from "@/components/installer/navigation/InstallerBreadcrumb";
import { PrepaidBalanceDisplay } from "@/components/installer/dashboard/prepaid/PrepaidBalanceDisplay";
import { RechargeOptions } from "@/components/installer/dashboard/prepaid/RechargeOptions";
import { useInstallerBalance } from "@/hooks/installer/useInstallerBalance";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, CreditCard, History, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SavedCards } from "@/components/installer/dashboard/prepaid/SavedCards";
import { PrepaidStats } from "@/components/installer/dashboard/prepaid/PrepaidStats";
import { TransactionHistory } from "@/components/installer/dashboard/prepaid/TransactionHistory";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const mockTransactions = [
  {
    id: "1",
    date: "2024-03-25",
    description: "Recharge du compte",
    amount: 500,
    type: "credit"
  },
  {
    id: "2",
    date: "2024-03-24",
    description: "Achat de lead",
    amount: 25,
    type: "debit"
  }
];

const mockCards = [
  {
    id: "card_1",
    last4: "4242",
    brand: "Visa",
    expMonth: 12,
    expYear: 2025
  }
];

const faqItems = [
  {
    question: "Comment fonctionne le compte prépayé ?",
    answer: "Le compte prépayé vous permet d'acheter des crédits à l'avance pour acquérir des leads. Vous pouvez recharger votre compte avec le montant de votre choix et utiliser ces crédits quand vous le souhaitez."
  },
  {
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express) et les virements bancaires pour les montants importants."
  },
  {
    question: "Les crédits ont-ils une date d'expiration ?",
    answer: "Non, vos crédits restent valables sans limite de temps. Vous pouvez les utiliser quand vous le souhaitez."
  },
  {
    question: "Comment obtenir une facture ?",
    answer: "Une facture est automatiquement générée et envoyée à votre adresse email après chaque recharge de votre compte."
  }
];

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

  const handleDeleteCard = (cardId: string) => {
    toast({
      title: "Carte supprimée",
      description: "La carte a été supprimée avec succès",
    });
  };

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
          {/* Section Solde et Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <PrepaidBalanceDisplay balance={balance || 0} />
            </div>
            <div className="md:col-span-2">
              <PrepaidStats />
            </div>
          </div>

          {/* Section Options de rechargement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 glass-card">
              <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Options de rechargement
              </h2>
              <RechargeOptions onRecharge={handleRecharge} isLoading={isRecharging} />
            </Card>
          </motion.div>

          {/* Section Cartes enregistrées et Historique */}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 glass-card">
              <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Questions fréquentes
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-primary/10">
                    <AccordionTrigger className="text-white hover:text-primary">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};