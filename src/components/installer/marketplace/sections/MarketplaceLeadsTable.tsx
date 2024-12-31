import { Lead } from "@/types/crm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface MarketplaceLeadsTableProps {
  leads: Lead[];
  selectedLeads: Lead[];
  onLeadSelect: (lead: Lead) => void;
}

export const MarketplaceLeadsTable = ({ 
  leads, 
  selectedLeads, 
  onLeadSelect 
}: MarketplaceLeadsTableProps) => {
  return (
    <div className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Tous les leads disponibles</h2>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-primary/10">
                <TableHead className="w-[50px]">
                  <Checkbox />
                </TableHead>
                <TableHead>Type de projet</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Code postal</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow 
                  key={lead.id}
                  className="border-b border-primary/10"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedLeads.some(l => l.id === lead.id)}
                      onCheckedChange={() => onLeadSelect(lead)}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={lead.clienttype === 'professional' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}>
                      {lead.clienttype === 'professional' ? 'Professionnel' : 'Résidentiel'}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.firstname}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      <span>Information masquée</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      <span>Information masquée</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      <span>Information masquée</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-primary/10">
                      {lead.postalcode}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => onLeadSelect(lead)}
                      variant="outline"
                      size="sm"
                      className="w-full bg-primary/10 hover:bg-primary/20 border-primary/20"
                    >
                      {selectedLeads.some(l => l.id === lead.id) ? "Désélectionner" : "Sélectionner"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};