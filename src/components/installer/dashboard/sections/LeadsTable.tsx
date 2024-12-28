import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, RefreshCw, ArrowUpRight } from "lucide-react";

const leads = [
  {
    name: "Sophie Laurent",
    email: "sophie@example.com",
    phone: "06 12 34 56 78",
    city: "Toulouse",
    status: "En cours",
    lastAction: "Il y a 2h",
  },
  {
    name: "Pierre Martin",
    email: "pierre@example.com",
    phone: "07 98 76 54 32",
    city: "Bordeaux",
    status: "Qualifié",
    lastAction: "Il y a 4h",
  },
  {
    name: "Marie Dubois",
    email: "marie@example.com",
    phone: "06 54 32 10 98",
    city: "Lyon",
    status: "Installation",
    lastAction: "Il y a 6h",
  },
];

export function LeadsTable() {
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">Gestion des Leads</h2>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Dernière Action</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.email}>
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>{lead.city}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-primary/10">
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell>{lead.lastAction}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}