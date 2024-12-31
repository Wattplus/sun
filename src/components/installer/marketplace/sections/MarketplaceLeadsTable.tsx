import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Home, Building2, Factory } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Lead } from "@/types/crm";

interface MarketplaceLeadsTableProps {
  leads: Lead[];
  selectedLeads: Lead[];
  onLeadSelect: (lead: Lead) => void;
  balance?: number;
}

export const MarketplaceLeadsTable = ({ 
  leads, 
  selectedLeads, 
  onLeadSelect,
}: MarketplaceLeadsTableProps) => {
  const getProjectIcon = (clientType: string) => {
    switch (clientType) {
      case 'residential':
        return <Home className="h-4 w-4" />;
      case 'professional':
        return <Building2 className="h-4 w-4" />;
      case 'industrial':
        return <Factory className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Tous les leads disponibles</h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Prénom</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Code postal</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedLeads.some(l => l.id === lead.id)}
                    onCheckedChange={() => onLeadSelect(lead)}
                  />
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="flex items-center gap-2 bg-primary/10 text-primary">
                    {getProjectIcon(lead.clienttype)}
                    <span>
                      {lead.clienttype === 'professional' ? 'Professionnel' : 
                       lead.clienttype === 'industrial' ? 'Industriel' : 'Résidentiel'}
                    </span>
                  </Badge>
                </TableCell>
                <TableCell>{lead.firstname}</TableCell>
                <TableCell>{lead.lastname}</TableCell>
                <TableCell>{lead.postalcode}</TableCell>
                <TableCell>{lead.price}€</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Lock className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};