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
      <Card className="overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#1EAEDB]/10">
                <Wallet className="h-6 w-6 text-[#1EAEDB]" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground/80">Solde disponible</h3>
                <p className={cn(
                  "text-3xl font-bold",
                  isLowBalance ? "text-red-500" : "text-[#1EAEDB]"
                )}>{balance}€</p>
              </div>
            </div>
            <Button 
              size="lg"
              onClick={onPrepaidAccount}
              className="bg-[#1EAEDB] hover:bg-[#1EAEDB]/90"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Recharger
            </Button>
          </div>

          {isLowBalance && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 text-red-500">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">
                Nous recommandons de maintenir un solde minimum de 200€ pour ne pas manquer d'opportunités.
              </p>
            </div>
          )}
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#1EAEDB]/10">
              <TrendingUp className="h-6 w-6 text-[#1EAEDB]" />
            </div>
            <h3 className="text-lg font-medium text-foreground/80">Tarifs des leads</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#1EAEDB]/5 border border-[#1EAEDB]/10">
              <h4 className="font-medium text-[#1EAEDB] mb-3">Compte prépayé</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Particulier</span>
                  <span className="font-bold text-[#1EAEDB]">26€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Professionnel</span>
                  <span className="font-bold text-[#1EAEDB]">49€</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/10">
              <h4 className="font-medium text-foreground/80 mb-3">Paiement direct</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Particulier</span>
                  <span className="font-semibold">35€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Professionnel</span>
                  <span className="font-semibold">59€</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-[#1EAEDB]">
              <Users className="h-5 w-5" />
              <span className="font-medium">{availableLeads.length} leads disponibles</span>
            </div>
            <Button 
              variant="outline" 
              className="border-[#1EAEDB] text-[#1EAEDB] hover:bg-[#1EAEDB]/10"
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