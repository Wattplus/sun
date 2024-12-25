import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Euro, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const PrepaidBalance = ({ balance = 0 }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleTopUp = async (amount: number) => {
    try {
      setIsLoading(true);
      const response = await fetch("https://dqzsycxxgltztufrhams.supabase.co/functions/v1/create-topup-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la session de paiement");
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Erreur de rechargement:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du rechargement du compte.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-background/50 backdrop-blur-md border-primary/20">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">Solde Prépayé</h3>
          <p className="text-2xl font-bold text-primary mt-1">
            {balance.toLocaleString()}€
          </p>
        </div>
        <Button 
          onClick={() => handleTopUp(100)}
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Recharger
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[50, 100, 200].map((amount) => (
          <Button
            key={amount}
            variant="outline"
            onClick={() => handleTopUp(amount)}
            disabled={isLoading}
            className="w-full"
          >
            <Euro className="h-4 w-4 mr-2" />
            {amount}€
          </Button>
        ))}
      </div>
    </Card>
  );
};