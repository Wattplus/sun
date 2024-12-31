import { useState } from "react";
import { InstallerBreadcrumb } from "@/components/installer/navigation/InstallerBreadcrumb";
import { PrepaidBalanceDisplay } from "@/components/installer/dashboard/prepaid/PrepaidBalanceDisplay";
import { RechargeOptions } from "@/components/installer/dashboard/prepaid/RechargeOptions";
import { useInstallerBalance } from "@/hooks/installer/useInstallerBalance";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

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

        <div className="space-y-8">
          <PrepaidBalanceDisplay balance={balance || 0} />
          <RechargeOptions onRecharge={handleRecharge} isLoading={isRecharging} />
        </div>
      </div>
    </div>
  );
};