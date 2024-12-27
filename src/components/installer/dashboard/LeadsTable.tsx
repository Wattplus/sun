import { Lead } from "@/types/crm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { EmptyLeadState } from "./EmptyLeadState";

interface LeadsTableProps {
  leads: Lead[];
  onLeadSelect?: (lead: Lead) => void;
  selectedLeads?: Lead[];
}

export const LeadsTable = ({ leads, onLeadSelect, selectedLeads = [] }: LeadsTableProps) => {
  const { toast } = useToast();

  const maskSensitiveInfo = (text: string) => {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Lock className="h-4 w-4" />
        <span>Information masquée</span>
      </div>
    );
  };

  if (leads.length === 0) {
    return <EmptyLeadState />;
  }

  return (
    <TooltipProvider>
      <Table>
        <TableHeader>
          <TableRow className="bg-primary/5 hover:bg-primary/10">
            {onLeadSelect && (
              <TableHead className="w-[50px]">
                <span className="sr-only">Sélection</span>
              </TableHead>
            )}
            <TableHead>Type de projet photovoltaïque</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Code postal</TableHead>
            <TableHead className="w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id} className="group hover:bg-primary/5">
              {onLeadSelect && (
                <TableCell>
                  <Checkbox
                    checked={selectedLeads.some(l => l.id === lead.id)}
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
          ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
};