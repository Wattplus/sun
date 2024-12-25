import { Lead } from "@/types/crm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { EmptyLeadState } from "./EmptyLeadState";

interface LeadsTableProps {
  leads: Lead[];
  onLeadSelect?: (lead: Lead) => void;
  selectedLeads?: Lead[];
}

export const LeadsTable = ({ leads, onLeadSelect, selectedLeads = [] }: LeadsTableProps) => {
  const getProjectTypeLabel = (type: string) => {
    switch (type) {
      case "residential":
        return "Résidentiel";
      case "professional":
        return "Professionnel";
      default:
        return type;
    }
  };

  if (leads.length === 0) {
    return <EmptyLeadState />;
  }

  return (
    <Table>
      <TableHeader className="bg-background/40">
        <TableRow>
          {onLeadSelect && (
            <TableHead className="w-[50px]">
              <span className="sr-only">Sélection</span>
            </TableHead>
          )}
          <TableHead>Type</TableHead>
          <TableHead>Département</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Prix</TableHead>
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
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {getProjectTypeLabel(lead.projectType)}
              </Badge>
            </TableCell>
            <TableCell>
              {lead.postalCode.substring(0, 2)}
            </TableCell>
            <TableCell>
              {lead.budget.toLocaleString()}€
            </TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(lead.createdAt), { 
                addSuffix: true,
                locale: fr 
              })}
            </TableCell>
            <TableCell className="text-right font-medium">
              {lead.price}€
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};