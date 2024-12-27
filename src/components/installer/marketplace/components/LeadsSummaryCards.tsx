import { Card } from "@/components/ui/card";
import { ListCheck, Plus, Wallet } from "lucide-react";
import { Lead } from "@/types/crm";
import { Button } from "@/components/ui/button";

interface LeadsSummaryCardsProps {
  availableLeads: Lead[];
  selectedLeads: Lead[];
  balance: number;
  onPrepaidAccount: () => void;
}

export const LeadsSummaryCards = ({ availableLeads, selectedLeads, balance, onPrepaidAccount }: LeadsSummaryCardsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="overflow-hidden border border-primary/10 bg-background/50 backdrop-blur-sm">
        <div className="p-6 flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10">
            <ListCheck className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-white">Leads disponibles</h3>
            <p className="text-sm text-primary/80">
              {availableLeads.length} lead{availableLeads.length > 1 ? 's' : ''} en attente
            </p>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden border border-primary/10 bg-background/50 backdrop-blur-sm">
        <div className="p-6 flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Plus className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-white">Leads sélectionnés</h3>
            <p className="text-sm text-primary/80">
              {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} sélectionné{selectedLeads.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden border border-primary/10 bg-background/50 backdrop-blur-sm">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-white">Solde disponible</h3>
              <p className="text-2xl font-semibold text-primary">{balance}€</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="bg-primary/10 hover:bg-primary/20 border-primary/20"
            onClick={onPrepaidAccount}
          >
            Recharger
          </Button>
        </div>
      </Card>
    </div>
  );
};