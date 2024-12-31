import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

interface LeadMobileCardProps {
  lead: Lead;
  isSelected: boolean;
  onSelect: (lead: Lead) => void;
  getProjectIcon: (clientType: string) => JSX.Element;
  getClientTypeLabel: (clientType: string) => string;
}

export const LeadMobileCard = ({
  lead,
  isSelected,
  onSelect,
  getProjectIcon,
  getClientTypeLabel,
}: LeadMobileCardProps) => {
  return (
    <Card key={lead.id} className="p-4 space-y-4 bg-background/50 backdrop-blur-sm border-primary/10">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="flex items-center gap-2 bg-primary/10 text-primary">
          {getProjectIcon(lead.clienttype)}
          <span>{getClientTypeLabel(lead.clienttype)}</span>
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-muted-foreground">Prénom:</span>
          <p>{lead.firstname}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Nom:</span>
          <p className="flex items-center gap-1">
            <Lock className="h-3 w-3" />
            <span className="text-muted-foreground">Masqué</span>
          </p>
        </div>
        <div>
          <span className="text-muted-foreground">Code postal:</span>
          <p>{lead.postalcode}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Facture:</span>
          <p>{lead.monthlybill}€</p>
        </div>
        <div className="col-span-2">
          <span className="text-muted-foreground">Prix:</span>
          <p className="font-semibold text-primary">{lead.price}€</p>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full bg-primary/10 hover:bg-primary/20 border-primary/20"
        onClick={() => onSelect(lead)}
      >
        {isSelected ? "Désélectionner" : "Sélectionner"}
      </Button>
    </Card>
  );
};