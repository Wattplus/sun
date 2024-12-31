import { useState } from "react";
import { InstallerBreadcrumb } from "@/components/installer/navigation/InstallerBreadcrumb";
import { useInstallerBalance } from "@/hooks/installer/useInstallerBalance";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";
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
          <PrepaidBalance balance={0} />

          {/* Section Cartes et Historique */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 glass-card h-full">
                <SavedCards cards={[]} onDeleteCard={() => {}} onAddCard={() => {}} />
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 glass-card h-full">
                <TransactionHistory transactions={[]} />
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