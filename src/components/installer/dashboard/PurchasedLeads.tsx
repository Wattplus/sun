import { ScrollArea } from "@/components/ui/scroll-area";
import { Lead } from "@/types/crm";
import { useState } from "react";
import { EmptyLeadState } from "./EmptyLeadState";
import { LeadCard } from "./LeadCard";
import { mockPurchasedLeads } from "./mockPurchasedLeads";

interface PurchasedLeadsProps {
  leads?: Lead[];
}

export const PurchasedLeads = ({ leads = mockPurchasedLeads }: PurchasedLeadsProps) => {
  const [leadStatuses, setLeadStatuses] = useState<Record<string, string>>(
    Object.fromEntries(leads.map(lead => [lead.id, "nouveau"]))
  );

  const updateLeadStatus = (leadId: string, status: string) => {
    setLeadStatuses(prev => ({ ...prev, [leadId]: status }));
  };

  if (leads.length === 0) {
    return <EmptyLeadState />;
  }

  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="space-y-4">
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            status={leadStatuses[lead.id]}
            onStatusChange={(status) => updateLeadStatus(lead.id, status)}
          />
        ))}
      </div>
    </ScrollArea>
  );
};