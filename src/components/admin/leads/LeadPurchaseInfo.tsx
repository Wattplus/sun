import { Badge } from "@/components/ui/badge";
import { Users, Euro } from "lucide-react";
import { Lead } from "@/types/crm";

interface LeadPurchaseInfoProps {
  lead: Lead;
}

export const LeadPurchaseInfo = ({ lead }: LeadPurchaseInfoProps) => {
  const purchaseCount = lead.purchasedby?.length || 0;
  const totalRevenue = purchaseCount * 25; // Prix fixe de 25€ par lead

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1.5">
        <Users className="h-4 w-4 text-primary" />
        <Badge variant="secondary" className="bg-primary/10">
          {purchaseCount} installateur{purchaseCount > 1 ? 's' : ''}
        </Badge>
      </div>
      {purchaseCount > 0 && (
        <div className="flex items-center gap-1.5">
          <Euro className="h-4 w-4 text-emerald-500" />
          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600">
            {totalRevenue}€
          </Badge>
        </div>
      )}
    </div>
  );
};