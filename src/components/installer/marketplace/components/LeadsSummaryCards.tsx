import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-0">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Solde disponible</p>
            <p className={cn(
              "text-2xl font-medium mt-1",
              isLowBalance ? "text-red-400" : "text-primary"
            )}>
              {balance}€
            </p>
          </div>

          {isLowBalance && (
            <p className="text-sm text-red-400">
              Solde minimum recommandé : 200€
            </p>
          )}

          <Button
            onClick={onPrepaidAccount}
            variant="outline"
            className="w-full bg-primary/5 hover:bg-primary/10 border-primary/10"
          >
            Recharger mon compte
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-white/5 backdrop-blur-sm border-0">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-4">Tarifs des leads</p>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Particulier</span>
                  <span className="text-sm text-primary">26€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Professionnel</span>
                  <span className="text-sm text-primary">49€</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-primary">
                {availableLeads.length} leads disponibles
              </p>
              <Button 
                variant="link" 
                onClick={onPrepaidAccount}
                className="text-primary hover:text-primary/80 p-0 h-auto font-normal"
              >
                Voir les détails
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};