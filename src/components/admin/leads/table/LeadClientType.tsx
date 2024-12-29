import { Badge } from "@/components/ui/badge";
import { Building2, User2 } from "lucide-react";
import { Lead } from "@/types/lead";

interface LeadClientTypeProps {
  lead: Lead;
}

export const LeadClientType = ({ lead }: LeadClientTypeProps) => {
  return (
    <div className="flex items-center gap-2">
      {lead.clienttype === 'particulier' ? (
        <User2 className="h-4 w-4 text-emerald-500" />
      ) : (
        <Building2 className="h-4 w-4 text-amber-500" />
      )}
      <Badge 
        variant="outline" 
        className={lead.clienttype === 'particulier' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}
      >
        {lead.clienttype === 'particulier' ? 'Particulier' : 'Professionnel'}
      </Badge>
    </div>
  );
};