import { Lead } from "@/types/crm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface LeadDesktopTableProps {
  leads: Lead[];
  selectedLeads: Lead[];
  onSelectLead: (lead: Lead) => void;
  getProjectIcon: (clientType: string) => JSX.Element;
  getClientTypeLabel: (clientType: string) => string;
}

export const LeadDesktopTable = ({
  leads,
  selectedLeads,
  onSelectLead,
  getProjectIcon,
  getClientTypeLabel,
}: LeadDesktopTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Prénom</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Code postal</TableHead>
          <TableHead>Facture mensuelle</TableHead>
          <TableHead>Prix</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell>
              <Badge variant="outline" className="flex items-center gap-2 bg-primary/10 text-primary">
                {getProjectIcon(lead.clienttype)}
                <span>{getClientTypeLabel(lead.clienttype)}</span>
              </Badge>
            </TableCell>
            <TableCell>{lead.firstname}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                <span className="text-muted-foreground">Masqué</span>
              </div>
            </TableCell>
            <TableCell>{lead.postalcode}</TableCell>
            <TableCell>{lead.monthlybill}€</TableCell>
            <TableCell className="font-semibold text-primary">{lead.price}€</TableCell>
            <TableCell className="text-right">
              <Button
                onClick={() => onSelectLead(lead)}
                variant="outline"
                size="sm"
                className="bg-primary/10 hover:bg-primary/20 border-primary/20"
              >
                {selectedLeads.some(l => l.id === lead.id) ? "Désélectionner" : "Sélectionner"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};