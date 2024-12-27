import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard, TrendingUp, Users, ArrowRight, AlertCircle } from "lucide-react";
import { Lead } from "@/types/crm";
import { cn } from "@/lib/utils";

interface LeadsSummaryCardsProps {
  availableLeads: Lead[];
  selectedLeads: Lead[];
  balance: number;
  onPrepaidAccount: () => void;
}

export const LeadsSummaryCards = ({
  availableLeads,
  selectedLeads,
  balance,
  onPrepaidAccount,
}: LeadsSummaryCardsProps) => {
  const isLowBalance = balance < 200;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="overflow-hidden border-0 shadow-sm bg-white/50 backdrop-blur-sm">
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/5">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Solde disponible</p>
                <p className={cn(
                  "text-3xl font-semibold mt-1",
                  isLowBalance ? "text-red-500" : "text-primary"
                )}>{balance}€</p>
              </div>
            </div>
            <Button 
              size="lg"
              onClick={onPrepaidAccount}
              className="bg-primary hover:bg-primary/90 text-white shadow-none"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Recharger
            </Button>
          </div>

          {isLowBalance && (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-100">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">
                Nous recommandons de maintenir un solde minimum de 200€ pour ne pas manquer d'opportunités.
              </p>
            </div>
          )}
        </div>
      </Card>

      <Card className="overflow-hidden border-0 shadow-sm bg-white/50 backdrop-blur-sm">
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-primary/5">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Tarifs des leads</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-primary/5">
              <p className="text-sm font-medium text-primary mb-4">Compte prépayé</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Particulier</span>
                  <span className="font-medium text-primary">26€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Professionnel</span>
                  <span className="font-medium text-primary">49€</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm font-medium text-muted-foreground mb-4">Paiement direct</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Particulier</span>
                  <span className="font-medium">35€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Professionnel</span>
                  <span className="font-medium">59€</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">{availableLeads.length} leads disponibles</span>
            </div>
            <Button 
              variant="outline" 
              className="border-primary/20 text-primary hover:bg-primary/5"
              onClick={onPrepaidAccount}
            >
              Voir les détails
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};