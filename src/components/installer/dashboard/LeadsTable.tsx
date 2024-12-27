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
          <TableHead className="font-semibold">Type de projet</TableHead>
          <TableHead className="font-semibold">Prénom</TableHead>
          <TableHead className="font-semibold">Nom</TableHead>
          <TableHead className="font-semibold">Email</TableHead>
          <TableHead className="font-semibold">Téléphone</TableHead>
          <TableHead className="font-semibold">Code postal</TableHead>
          <TableHead className="font-semibold">Type de toit</TableHead>
          <TableHead className="font-semibold">Facture mensuelle</TableHead>
          <TableHead className="font-semibold">Installation électrique</TableHead>
          <TableHead className="w-[100px] font-semibold">Action</TableHead>
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