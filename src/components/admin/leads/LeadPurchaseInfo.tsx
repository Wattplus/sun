import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { Lead } from "@/types/crm";

interface LeadPurchaseInfoProps {
  lead: Lead;
}

export const LeadPurchaseInfo = ({ lead }: LeadPurchaseInfoProps) => {
  const purchaseCount = lead.purchasedby?.length || 0;

  return (
    <div className="flex items-center gap-2">
      <Users className="h-4 w-4 text-primary" />
      <Badge variant="secondary" className="bg-primary/10">
        {purchaseCount} installateur{purchaseCount > 1 ? 's' : ''}
      </Badge>
    </div>
  );
};