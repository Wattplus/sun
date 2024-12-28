import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, RefreshCw, FileText } from "lucide-react";

const quotes = [
  {
    id: "20241234",
    client: "Sophie Laurent",
    amount: "7,500",
    status: "En attente",
    date: "26/12/2024",
  },
  {
    id: "20241233",
    client: "Pierre Martin",
    amount: "6,800",
    status: "Accepté",
    date: "25/12/2024",
  },
  {
    id: "20241232",
    client: "Marie Dubois",
    amount: "9,200",
    status: "En cours d'examen",
    date: "24/12/2024",
  },
  {
    id: "20241231",
    client: "Jean Dupont",
    amount: "5,600",
    status: "Refusé",
    date: "22/12/2024",
  }
];

export function QuotesOverview() {
  return (
    <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
      <h2 className="text-lg font-semibold mb-6 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
        Suivi des Devis
      </h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Devis</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Montant (€)</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date d'Émission</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes.map((quote) => (
            <TableRow key={quote.id} className="group hover:bg-primary/5">
              <TableCell className="font-medium">Devis #{quote.id}</TableCell>
              <TableCell>{quote.client}</TableCell>
              <TableCell>{quote.amount}€</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-primary/10">
                  {quote.status}
                </Badge>
              </TableCell>
              <TableCell>{quote.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
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