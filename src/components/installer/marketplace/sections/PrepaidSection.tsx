import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Euro, CreditCard, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PrepaidSection = () => {
  const { toast } = useToast();

  const handleRecharge = (amount: number) => {
    toast({
      title: "Rechargement",
      description: `Redirection vers la page de paiement pour ${amount}€...`,
    });
  };

  return (
    <Card className="mb-4 bg-white/5 backdrop-blur-sm border-primary/10">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          {/* Balance */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Euro className="h-4 w-4 text-primary" />
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Solde disponible</span>
              <p className="text-xl font-semibold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
                150€
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs border-primary/20 hover:bg-primary/5"
            >
              <CreditCard className="h-3 w-3 mr-1" />
              Paiement direct
            </Button>
            <Button 
              size="sm"
              className="text-xs bg-primary/10 hover:bg-primary/20 text-primary border-0"
            >
              <Wallet className="h-3 w-3 mr-1" />
              Recharger
            </Button>
          </div>
        </div>

        {/* Quick Top-up Amounts */}
        <div className="flex gap-2 pt-2">
          {[50, 100, 200].map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              onClick={() => handleRecharge(amount)}
              className="text-xs flex-1 border-primary/10 hover:bg-primary/5"
            >
              +{amount}€
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};