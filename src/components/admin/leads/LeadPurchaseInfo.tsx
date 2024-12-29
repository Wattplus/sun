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
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-primary" />
        <Badge variant="secondary" className="bg-primary/10">
          {purchaseCount} installateur{purchaseCount > 1 ? 's' : ''}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <Euro className="h-4 w-4 text-emerald-500" />
        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600">
          Revenu: {totalRevenue}€
        </Badge>
      </div>
    </div>
  );
};