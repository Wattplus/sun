import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard, TrendingUp, Users, ArrowRight } from "lucide-react";
import { Lead } from "@/types/crm";

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
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-6 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/20 border-primary/20">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">Solde disponible</h3>
                <p className="text-2xl font-bold text-primary">{balance}€</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 border-white/20"
              onClick={onPrepaidAccount}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Recharger
            </Button>
          </div>
          <div className="text-sm text-white/80 bg-primary/10 p-3 rounded-lg">
            Nous recommandons de maintenir un solde minimum de 200€ pour ne pas manquer d'opportunités.
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/20 border-primary/20">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">Tarifs des leads</h3>
                <div className="flex gap-4 mt-1">
                  <span className="text-sm text-white/80">Particulier: 26€-35€</span>
                  <span className="text-sm text-white/80">Pro: 49€-59€</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-white mb-2">Compte prépayé</h4>
              <div className="space-y-1">
                <p className="text-primary">Particulier: 26€</p>
                <p className="text-primary">Professionnel: 49€</p>
              </div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-white mb-2">Paiement direct</h4>
              <div className="space-y-1">
                <p className="text-white/80">Particulier: 35€</p>
                <p className="text-white/80">Professionnel: 59€</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm text-white/80">{availableLeads.length} leads disponibles</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/10 hover:bg-white/20 border-white/20"
              onClick={onPrepaidAccount}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Voir les détails
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};