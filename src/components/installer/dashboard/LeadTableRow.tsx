import { Lead } from "@/types/crm";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Lock, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LeadTableRowProps {
  lead: Lead;
  onLeadSelect?: (lead: Lead) => void;
  isSelected?: boolean;
}

export const LeadTableRow = ({ lead, onLeadSelect, isSelected }: LeadTableRowProps) => {
  const maskSensitiveInfo = (text: string) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 text-muted-foreground hover:text-primary/80 transition-colors cursor-help">
            <Lock className="h-4 w-4" />
            <span>Information masquée</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Cette information sera visible après l'achat du lead</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const renderOptionalInfo = (value: string | undefined, label: string) => {
    if (!value) {
      return (
        <div className="flex items-center gap-2 text-muted-foreground/60 italic">
          <Info className="h-4 w-4" />
          <span>Non renseigné</span>
        </div>
      );
    }
    return (
      <span className="text-primary font-medium">
        {value}
      </span>
    );
  };

  return (
    <TableRow className="group hover:bg-primary/5 transition-colors">
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
          className={`
            ${lead.projectType === 'professional' 
              ? 'bg-amber-500/10 text-amber-600 border-amber-200/20' 
              : 'bg-emerald-500/10 text-emerald-600 border-emerald-200/20'
            }
          `}
        >
          {lead.projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}
        </Badge>
      </TableCell>
      <TableCell className="font-medium text-foreground">{lead.firstname}</TableCell>
      <TableCell>{maskSensitiveInfo(lead.lastname)}</TableCell>
      <TableCell>{maskSensitiveInfo(lead.email)}</TableCell>
      <TableCell>{maskSensitiveInfo(lead.phone)}</TableCell>
      <TableCell>
        <Badge variant="outline" className="bg-primary/5 border-primary/20">
          {lead.postalcode}
        </Badge>
      </TableCell>
      
      <TableCell>{renderOptionalInfo(lead.roofType?.replace(/-/g, ' '), 'Type de toit')}</TableCell>
      <TableCell>
        {lead.monthlybill ? (
          <span className="text-primary font-medium">{lead.monthlybill}€/mois</span>
        ) : (
          renderOptionalInfo(undefined, 'Facture mensuelle')
        )}
      </TableCell>
      <TableCell>
        {lead.electricalType ? (
          <span className="text-primary font-medium">
            {lead.electricalType === 'monophase' ? 'Monophasé' : 'Triphasé'}
          </span>
        ) : (
          renderOptionalInfo(undefined, "Type d'installation")
        )}
      </TableCell>

      <TableCell>
        <Button
          size="sm"
          className="w-full bg-primary hover:bg-primary/90 opacity-0 group-hover:opacity-100 transition-all duration-300"
          onClick={() => onLeadSelect?.(lead)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Acheter
        </Button>
      </TableCell>
    </TableRow>
  );
};