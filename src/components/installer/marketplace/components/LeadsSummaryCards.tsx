import { Card } from "@/components/ui/card";
import { ListCheck, Plus } from "lucide-react";
import { Lead } from "@/types/crm";
import { BalanceSection } from "../sections/BalanceSection";

interface LeadsSummaryCardsProps {
  availableLeads: Lead[];
  selectedLeads: Lead[];
  balance: number;
  onPrepaidAccount: () => void;
}

export const LeadsSummaryCards = ({ availableLeads, selectedLeads, balance, onPrepaidAccount }: LeadsSummaryCardsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-6 bg-primary/5 border border-primary/10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10">
            <ListCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Leads disponibles</h3>
            <p className="text-sm text-primary/80">{availableLeads.length} leads en attente</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-primary/5 border border-primary/10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Plus className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Leads sélectionnés</h3>
            <p className="text-sm text-primary/80">{selectedLeads.length} leads sélectionnés</p>
          </div>
        </div>
      </Card>

      <BalanceSection 
        balance={balance}
        onPrepaidAccount={onPrepaidAccount}
      />
    </div>
  );
};