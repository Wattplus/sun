import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Euro, CreditCard, Shield, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase-client";

export const TopUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTopUp = async (amount: number) => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Vous devez être connecté pour recharger votre compte");
        return;
      }

      const response = await supabase.functions.invoke('create-topup-session', {
        body: { amount }
      });

      if (response.error) throw response.error;

      if (response.data?.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Error creating top-up session:', error);
      toast.error("Une erreur est survenue lors de la création de la session de paiement");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Recharger mon compte</h1>
          <p className="text-lg text-white/60">
            Choisissez le montant à recharger pour accéder à plus de leads qualifiés
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[50, 100, 200].map((amount) => (
            <Card 
              key={amount}
              className="p-6 bg-white/5 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer"
              onClick={() => handleTopUp(amount)}
            >
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-primary/10 w-fit">
                  <Euro className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{amount}€</p>
                  <p className="text-sm text-white/60">≈ {Math.floor(amount / 26)} leads</p>
                </div>
                <Button 
                  className="w-full bg-primary/10 hover:bg-primary/20 text-primary"
                  disabled={isLoading}
                >
                  Recharger {amount}€
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3 mt-12">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-white">Paiement sécurisé</h3>
              <p className="text-sm text-white/60">
                Vos transactions sont protégées
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-white">Recharge instantanée</h3>
              <p className="text-sm text-white/60">
                Crédit disponible immédiatement
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-white">Leads qualifiés</h3>
              <p className="text-sm text-white/60">
                Prospects vérifiés et qualifiés
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};