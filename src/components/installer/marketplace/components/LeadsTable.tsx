import { Lead } from "@/types/crm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LeadsTableProps {
  leads: Lead[];
  selectedLeads: Lead[];
  onSelectAll: () => void;
  onSelectLead: (lead: Lead) => void;
}

export const LeadsTable = ({ leads, selectedLeads, onSelectAll, onSelectLead }: LeadsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-primary/10 hover:bg-primary/5">
          <TableHead className="text-primary w-[50px]">
            <Checkbox
              checked={selectedLeads.length === leads.length}
              onCheckedChange={onSelectAll}
              className="border-primary/50"
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
          <TableHead className="text-primary">Installation électrique</TableHead>
          <TableHead className="text-primary w-[100px]">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow 
            key={lead.id}
            className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
          >
            <TableCell>
              <Checkbox
                checked={selectedLeads.some(l => l.id === lead.id)}
                onCheckedChange={() => onSelectLead(lead)}
                className="border-primary/50"
              />
            </TableCell>
            <TableCell className="text-white font-medium">
              <Badge variant="outline" className={lead.projectType === 'professional' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}>
                {lead.projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}
              </Badge>
            </TableCell>
            <TableCell className="text-white">{lead.firstName}</TableCell>
            <TableCell className="text-white">{lead.lastName}</TableCell>
            <TableCell className="text-white">{lead.email}</TableCell>
            <TableCell className="text-white">{lead.phone}</TableCell>
            <TableCell className="text-white">
              <Badge variant="outline" className="bg-primary/10">
                {lead.postalCode}
              </Badge>
            </TableCell>
            <TableCell className="text-white">{lead.roofType || "Non spécifié"}</TableCell>
            <TableCell className="text-white">{lead.monthlyBill || "Non spécifié"}€</TableCell>
            <TableCell className="text-white">{lead.electricalType || "Non spécifié"}</TableCell>
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