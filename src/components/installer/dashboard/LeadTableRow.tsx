import { Lead } from "@/types/crm";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Lock } from "lucide-react";

interface LeadTableRowProps {
  lead: Lead;
  onLeadSelect?: (lead: Lead) => void;
  isSelected?: boolean;
}

export const LeadTableRow = ({ lead, onLeadSelect, isSelected }: LeadTableRowProps) => {
  const maskSensitiveInfo = (text: string) => (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Lock className="h-4 w-4" />
      <span>Information masquée</span>
    </div>
  );

  return (
    <TableRow className="group hover:bg-primary/5">
      {onLeadSelect && (
        <TableCell>
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onLeadSelect(lead)}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
        </TableCell>
      )}
      <TableCell>
        <Badge 
          variant="outline" 
          className="bg-primary/10 text-primary border-primary/20"
        >
          {lead.projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}
        </Badge>
      </TableCell>
      <TableCell>{lead.firstName}</TableCell>
      <TableCell>{maskSensitiveInfo(lead.lastName)}</TableCell>
      <TableCell>{maskSensitiveInfo(lead.email)}</TableCell>
      <TableCell>{maskSensitiveInfo(lead.phone)}</TableCell>
      <TableCell>{lead.postalCode}</TableCell>
      
      {/* Nouvelles colonnes synchronisées */}
      <TableCell>
        {lead.roofType ? (
          <span className="text-primary">{lead.roofType.replace(/-/g, ' ')}</span>
        ) : (
          <span className="text-muted-foreground italic">Non renseigné</span>
        )}
      </TableCell>
      <TableCell>
        {lead.monthlyBill ? (
          <span className="text-primary">{lead.monthlyBill}€/mois</span>
        ) : (
          <span className="text-muted-foreground italic">Non renseigné</span>
        )}
      </TableCell>
      <TableCell>
        {lead.electricalType ? (
          <span className="text-primary">{lead.electricalType === 'monophase' ? 'Monophasé' : 'Triphasé'}</span>
        ) : (
          <span className="text-muted-foreground italic">Non renseigné</span>
        )}
      </TableCell>

      <TableCell>
        <Button
          size="sm"
          className="w-full bg-primary hover:bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onLeadSelect?.(lead)}
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Acheter
        </Button>
      </TableCell>
    </TableRow>
  );
};