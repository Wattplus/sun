import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Home, Building2, Factory } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  const getProjectIcon = (clientType: string) => {
    switch (clientType) {
      case 'professional':
        return <Building2 className="h-4 w-4" />;
      case 'industrial':
        return <Factory className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  const getClientTypeLabel = (clientType: string) => {
    switch (clientType) {
      case 'professional':
        return 'Professionnel';
      case 'industrial':
        return 'Industriel';
      default:
        return 'Résidentiel';
    }
  };

  if (isMobile) {
    return (
      <div className="space-y-4 p-4">
        <h2 className="text-lg font-medium mb-4">Leads disponibles</h2>
        {leads.map((lead) => (
          <Card key={lead.id} className="p-4 space-y-4 bg-background/50 backdrop-blur-sm border-primary/10">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="flex items-center gap-2 bg-primary/10 text-primary">
                {getProjectIcon(lead.clienttype)}
                <span>{getClientTypeLabel(lead.clienttype)}</span>
              </Badge>
              <Checkbox
                checked={selectedLeads.some(l => l.id === lead.id)}
                onCheckedChange={() => onLeadSelect(lead)}
                className="border-primary/50"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Prénom:</span>
                <p>{lead.firstname}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Code postal:</span>
                <p>{lead.postalcode}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Facture:</span>
                <p>{lead.monthlybill}€</p>
              </div>
              <div>
                <span className="text-muted-foreground">Prix:</span>
                <p>{lead.price}€</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-primary/10">
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-primary/10 hover:bg-primary/20 border-primary/20"
                onClick={() => onLeadSelect(lead)}
              >
                {selectedLeads.some(l => l.id === lead.id) ? "Désélectionner" : "Sélectionner"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    );
  }

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
              <TableHead>Facture mensuelle</TableHead>
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
                    className="border-primary/50"
                  />
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="flex items-center gap-2 bg-primary/10 text-primary">
                    {getProjectIcon(lead.clienttype)}
                    <span>
                      {getClientTypeLabel(lead.clienttype)}
                    </span>
                  </Badge>
                </TableCell>
                <TableCell>{lead.firstname}</TableCell>
                <TableCell>{lead.lastname}</TableCell>
                <TableCell>{lead.postalcode}</TableCell>
                <TableCell>{lead.monthlybill}€</TableCell>
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