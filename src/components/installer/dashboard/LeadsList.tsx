import { Lead } from "@/types/crm";
import { LeadCard } from "@/components/admin/marketplace/LeadCard";
import { EmptyLeadState } from "./EmptyLeadState";

interface LeadsListProps {
  leads: Lead[];
}

export const LeadsList = ({ leads }: LeadsListProps) => {
  // Filtrer les leads qui n'ont pas encore été achetés
  const availableLeads = leads.filter(lead => !lead.purchasedBy?.length);

  if (availableLeads.length === 0) {
    return <EmptyLeadState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {availableLeads.map((lead) => (
        <LeadCard
          key={lead.id}
          lead={lead}
          onPurchase={() => {}}
          subscriptionTier="free"
        />
      ))}
    </div>
  );
};