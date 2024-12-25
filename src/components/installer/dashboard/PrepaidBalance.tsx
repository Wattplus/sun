import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Euro, Plus, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PrepaidBalanceProps {
  balance: number;
}

export const PrepaidBalance = ({ balance }: PrepaidBalanceProps) => {
  const { toast } = useToast();

  const handleRecharge = () => {
    toast({
      title: "Rechargement",
      description: "Redirection vers la page de paiement...",
    });
  };

  const handleHistory = () => {
    toast({
      title: "Historique",
      description: "Affichage de l'historique des transactions...",
    });
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold">Solde prépayé</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Utilisé pour l'achat automatique de leads
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold">{balance}€</p>
          <p className="text-sm text-muted-foreground">
            Seuil bas: 50€
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleRecharge} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Recharger
        </Button>
        <Button variant="outline" onClick={handleHistory} className="flex items-center gap-2">
          <History className="h-4 w-4" />
          Historique
        </Button>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">
          Conseil: Maintenez un solde minimum de 200€ pour ne pas manquer d'opportunités
        </p>
      </div>
    </Card>
  );
};