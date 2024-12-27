import { Lead } from "@/types/crm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyLeadState } from "./EmptyLeadState";
import { LeadTableRow } from "./LeadTableRow";

interface LeadsTableProps {
  leads: Lead[];
  onLeadSelect?: (lead: Lead) => void;
  selectedLeads?: Lead[];
}

export const LeadsTable = ({ leads, onLeadSelect, selectedLeads = [] }: LeadsTableProps) => {
  if (leads.length === 0) {
    return <EmptyLeadState />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-primary/5 hover:bg-primary/10">
          {onLeadSelect && (
            <TableHead className="w-[50px]">
              <span className="sr-only">Sélection</span>
            </TableHead>
          )}
          <TableHead>Type de projet</TableHead>
          <TableHead>Prénom</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Téléphone</TableHead>
          <TableHead>Code postal</TableHead>
          <TableHead>Type de toit</TableHead>
          <TableHead>Facture mensuelle</TableHead>
          <TableHead>Installation électrique</TableHead>
          <TableHead className="w-[100px]">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <LeadTableRow
            key={lead.id}
            lead={lead}
            onLeadSelect={onLeadSelect}
            isSelected={selectedLeads.some(l => l.id === lead.id)}
          />
        ))}
      </TableBody>
    </Table>
  );
};