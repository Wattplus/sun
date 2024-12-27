import { Wallet, Plus, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BalanceSectionProps {
  balance: number;
  onPrepaidAccount: () => void;
}

export const BalanceSection = ({ balance, onPrepaidAccount }: BalanceSectionProps) => {
  return (
    <Card className="relative overflow-hidden p-4 sm:p-6 bg-white/5 backdrop-blur-sm border-primary/10">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse" />
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="p-3 rounded-xl bg-primary/10 backdrop-blur-sm">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-white/60">Solde disponible</p>
            <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {balance}€
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button 
            variant="outline" 
            size="lg"
            className="w-full sm:w-auto border-primary/20 hover:bg-primary/10 text-white"
            onClick={onPrepaidAccount}
          >
            <Plus className="h-4 w-4 mr-2 text-primary" />
            Recharger
          </Button>
          <Button 
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90"
            onClick={onPrepaidAccount}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Gérer mon compte
          </Button>
        </div>
      </div>
    </Card>
  );
};