import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Calendar, ArrowUpRight } from "lucide-react";

const leads = [
  {
    name: "Sophie Laurent",
    phone: "06 12 34 56 78",
    city: "Toulouse",
    status: "En cours",
    date: "26/12/2024",
  },
  {
    name: "Pierre Martin",
    phone: "07 98 76 54 32",
    city: "Bordeaux",
    status: "Devis accepté",
    date: "25/12/2024",
  },
  {
    name: "Marie Dubois",
    phone: "06 54 32 10 98",
    city: "Lyon",
    status: "Installation prévue",
    date: "24/12/2024",
  },
  {
    name: "Jean Dupont",
    phone: "06 11 22 33 44",
    city: "Marseille",
    status: "En attente",
    date: "22/12/2024",
  }
];

export function LeadsOverview() {
  return (
    <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
      <h2 className="text-lg font-semibold mb-6 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
        Gestion des Leads
      </h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Ville</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date d'Attribution</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.name} className="group hover:bg-primary/5">
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>{lead.city}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-primary/10">
                  {lead.status}
                </Badge>
              </TableCell>
              <TableCell>{lead.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Calendar className="h-4 w-4" />
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
    </Card>
  );
}