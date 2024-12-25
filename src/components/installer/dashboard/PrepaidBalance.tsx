import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Euro, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

export const PrepaidBalance = ({ balance = 0 }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");

  const handleTopUp = async (selectedAmount: number) => {
    if (selectedAmount <= 0) {
      toast({
        title: "Erreur",
        description: "Le montant doit être supérieur à 0€",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("https://dqzsycxxgltztufrhams.supabase.co/functions/v1/create-topup-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ amount: selectedAmount }),
      });

      if (!response.ok) throw new Error();

      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-panel">
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Mon Portefeuille</h3>
            <p className="text-2xl font-bold text-primary mt-1">
              {balance.toLocaleString()}€
            </p>
          </div>
          <Button 
            onClick={() => handleTopUp(100)}
            disabled={isLoading}
            className="glass-button"
          >
            <Plus className="h-4 w-4 mr-2" />
            Recharger
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {[50, 100, 200].map((value) => (
            <Button
              key={value}
              variant="outline"
              onClick={() => handleTopUp(value)}
              disabled={isLoading}
              className="glass-button"
            >
              <Euro className="h-4 w-4 mr-1" />
              {value}€
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Montant personnalisé"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="glass-button"
          />
          <Button
            onClick={() => handleTopUp(Number(amount))}
            disabled={isLoading}
            className="glass-button whitespace-nowrap"
          >
            <Euro className="h-4 w-4 mr-1" />
            Valider
          </Button>
        </div>
      </div>
    </Card>
  );
};