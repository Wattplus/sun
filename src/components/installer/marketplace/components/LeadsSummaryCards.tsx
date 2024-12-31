import { Lead } from "@/types/crm";
import { BalanceCard } from "./cards/BalanceCard";
import { PricingCard } from "./cards/PricingCard";

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
      <BalanceCard balance={balance} />
      <PricingCard 
        availableLeads={availableLeads.length}
        onPrepaidAccount={onPrepaidAccount}
      />
    </div>
  );
};