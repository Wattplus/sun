import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Euro, Plus, CreditCard, History } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "credit",
    amount: 100,
    description: "Rechargement par carte",
    date: "2024-03-20 14:30"
  },
  {
    id: "2",
    type: "debit",
    amount: 35,
    description: "Achat lead exclusif - Paris",
    date: "2024-03-20 15:45"
  }
];

export const PrepaidBalance = ({ balance = 0 }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showCardDialog, setShowCardDialog] = useState(false);
  const [transactions] = useState<Transaction[]>(mockTransactions);

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
    <>
      <Card className="p-6 bg-background/50 backdrop-blur-md border-primary/20">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold">Solde Prépayé</h3>
            <p className="text-2xl font-bold text-primary mt-1">
              {balance.toLocaleString()}€
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-2"
            >
              <History className="h-4 w-4" />
              Historique
            </Button>
            <Button 
              variant="outline"
              onClick={() => setShowCardDialog(true)}
              className="flex items-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              Gérer CB
            </Button>
            <Button 
              onClick={() => handleTopUp(100)}
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Recharger
            </Button>
          </div>
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

      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Historique des transactions</DialogTitle>
            <DialogDescription>
              Consultez l'historique de vos rechargements et dépenses
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.date}
                    </p>
                  </div>
                  <p className={`font-semibold ${
                    transaction.type === 'credit' 
                      ? 'text-green-500' 
                      : 'text-red-500'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}
                    {transaction.amount}€
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={showCardDialog} onOpenChange={setShowCardDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gestion des moyens de paiement</DialogTitle>
            <DialogDescription>
              Ajoutez ou modifiez vos cartes bancaires
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Carte Visa ****4242</p>
                  <p className="text-sm text-muted-foreground">Expire 12/25</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Supprimer
              </Button>
            </div>
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une carte
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};