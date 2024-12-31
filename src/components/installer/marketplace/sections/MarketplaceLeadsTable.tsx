import { Lead } from "@/types/crm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Home, Building2, Factory, Wallet } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

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
  balance = 0
}: MarketplaceLeadsTableProps) => {
  const navigate = useNavigate();

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
        <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/10 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              <span className="text-lg font-medium">Solde disponible: {balance}€</span>
            </div>
            <Button 
              onClick={() => navigate('/espace-installateur/mon-compte/prepaid')}
              variant="outline"
              className="bg-primary/10 hover:bg-primary/20 border-primary/20"
            >
              Recharger mon compte
            </Button>
          </div>
        </Card>

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
                    <Badge variant="outline" className="flex items-center gap-2 bg-primary/10 text-primary">
                      {getProjectIcon(lead.clienttype)}
                      <span>
                        {lead.clienttype === 'professional' ? 'Professionnel' : 
                         lead.clienttype === 'industrial' ? 'Industriel' : 'Résidentiel'}
                      </span>
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