import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface BalanceCardProps {
  balance: number;
}

export const BalanceCard = ({ balance }: BalanceCardProps) => {
  const navigate = useNavigate();
  const isLowBalance = balance < 200;

  const handleRechargeClick = () => {
    navigate("/espace-installateur/mon-compte/prepaid");
  };

  return (
    <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/10">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Wallet className="w-5 h-5 text-primary" />
        </div>
        <div className="space-y-4 flex-1">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Solde disponible</p>
            <p className={cn(
              "text-3xl font-semibold",
              isLowBalance ? "text-red-400" : "text-primary"
            )}>
              {balance}€
            </p>
          </div>

          {isLowBalance && (
            <div className="py-2 px-3 bg-red-500/10 rounded-lg">
              <p className="text-sm text-red-400">
                Solde minimum recommandé : 200€
              </p>
            </div>
          )}

          <Button
            onClick={handleRechargeClick}
            className="w-full bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
          >
            Recharger mon compte
          </Button>
        </div>
      </div>
    </Card>
  );
};