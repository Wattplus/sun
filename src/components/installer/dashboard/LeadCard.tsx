import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Euro, Lock } from "lucide-react";
import { calculateLeadPrice } from "@/utils/leadPricing";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface LeadCardProps {
  lead: Lead;
  status: "available" | "purchased";
  onStatusChange: (lead: Lead) => void;
}

export const LeadCard = ({ lead, status, onStatusChange }: LeadCardProps) => {
  const price = calculateLeadPrice(lead.clienttype, false); // Add false as second argument
  const age = formatDistanceToNow(new Date(lead.created_at), { 
    addSuffix: true,
    locale: fr 
  });

  return (
    <Card className="p-4 space-y-4 bg-background/50 backdrop-blur-sm border border-primary/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge 
            variant="outline" 
            className={`
              ${lead.clienttype === 'professional' 
                ? 'bg-amber-500/10 text-amber-600 border-amber-200/20' 
                : 'bg-emerald-500/10 text-emerald-600 border-emerald-200/20'
              }
            `}
          >
            {lead.clienttype === 'professional' ? 'Professionnel' : 'Résidentiel'}
          </Badge>
          <Badge variant="outline" className="bg-primary/10 border-primary/20">
            {age}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Euro className="h-4 w-4 text-primary" />
          <span className="font-medium">{price}€</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{lead.postalcode}</span>
          {lead.city && (
            <span className="text-muted-foreground">
              ({lead.city})
            </span>
          )}
        </div>

        {status === "purchased" ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">{lead.firstname} {lead.lastname}</span>
            </div>
            <div>
              <a 
                href={`mailto:${lead.email}`}
                className="text-sm text-primary hover:underline"
              >
                {lead.email}
              </a>
            </div>
            <div>
              <a 
                href={`tel:${lead.phone}`}
                className="text-sm text-primary hover:underline"
              >
                {lead.phone}
              </a>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Informations masquées</span>
          </div>
        )}
      </div>

      {status === "available" && (
        <Button 
          onClick={() => onStatusChange(lead)}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Acheter ce lead
        </Button>
      )}
    </Card>
  );
};