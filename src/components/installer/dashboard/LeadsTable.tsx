import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lead } from "@/types/crm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";

interface LeadsTableProps {
  leads: Lead[];
  selectedLeads: Lead[];
  onSelectAll: () => void;
  onSelectLead: (lead: Lead) => void;
}

const MaskedInfo = () => (
  <Tooltip content="Cette information sera visible après l'achat du lead">
    <div className="flex items-center gap-2 text-muted-foreground hover:text-primary/80 transition-colors cursor-help">
      <Lock className="h-4 w-4" />
      <span>Information masquée</span>
    </div>
  </Tooltip>
);

export const LeadsTable = ({ leads, selectedLeads, onSelectAll, onSelectLead }: LeadsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-primary w-[50px]">
            <input
              type="checkbox"
              checked={selectedLeads.length === leads.length}
              onChange={onSelectAll}
              className="rounded border-primary/50"
            />
          </TableHead>
          <TableHead className="text-primary">Type de projet</TableHead>
          <TableHead className="text-primary">Prénom</TableHead>
          <TableHead className="text-primary">Nom</TableHead>
          <TableHead className="text-primary">Email</TableHead>
          <TableHead className="text-primary">Téléphone</TableHead>
          <TableHead className="text-primary">Code postal</TableHead>
          <TableHead className="text-primary">Type de toit</TableHead>
          <TableHead className="text-primary">Facture mensuelle</TableHead>
          <TableHead className="text-primary w-[100px]">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id} className="border-b border-primary/10 hover:bg-primary/5">
            <TableCell>
              <input
                type="checkbox"
                checked={selectedLeads.some(l => l.id === lead.id)}
                onChange={() => onSelectLead(lead)}
                className="rounded border-primary/50"
              />
            </TableCell>
            <TableCell>
              <Badge variant="outline" className={lead.clienttype === 'professionnel' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}>
                {lead.clienttype === 'professionnel' ? 'Professionnel' : 'Résidentiel'}
              </Badge>
            </TableCell>
            <TableCell>{lead.firstname}</TableCell>
            <TableCell><MaskedInfo /></TableCell>
            <TableCell><MaskedInfo /></TableCell>
            <TableCell><MaskedInfo /></TableCell>
            <TableCell>
              <Badge variant="outline" className="bg-primary/10">
                {lead.postalcode}
              </Badge>
            </TableCell>
            <TableCell>{lead.roofType || "Non spécifié"}</TableCell>
            <TableCell>{lead.monthlybill ? `${lead.monthlybill}€` : "Non spécifié"}</TableCell>
            <TableCell>
              <Button
                onClick={() => onSelectLead(lead)}
                variant={selectedLeads.some(l => l.id === lead.id) ? "secondary" : "outline"}
                className="w-full bg-primary/10 hover:bg-primary/20 border-primary/20"
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