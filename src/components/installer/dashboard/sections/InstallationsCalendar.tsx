import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone, FileText, CheckCircle } from "lucide-react";

const installations = [
  {
    client: "Sophie Laurent",
    city: "Toulouse",
    date: "28/12/2024",
    status: "En attente",
    team: "Équipe 3",
  },
  {
    client: "Pierre Martin",
    city: "Bordeaux",
    date: "27/12/2024",
    status: "Confirmée",
    team: "Équipe 2",
  },
  {
    client: "Marie Dubois",
    city: "Lyon",
    date: "26/12/2024",
    status: "Confirmée",
    team: "Équipe 1",
  }
];

export function InstallationsCalendar() {
  return (
    <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
      <h2 className="text-lg font-semibold mb-6 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
        Planning des Installations
      </h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Ville</TableHead>
            <TableHead>Date Prévue</TableHead>
            <TableHead>État</TableHead>
            <TableHead>Équipe Assignée</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {installations.map((installation) => (
            <TableRow key={installation.client} className="group hover:bg-primary/5">
              <TableCell className="font-medium">{installation.client}</TableCell>
              <TableCell>{installation.city}</TableCell>
              <TableCell>{installation.date}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-primary/10">
                  {installation.status}
                </Badge>
              </TableCell>
              <TableCell>{installation.team}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <CheckCircle className="h-4 w-4" />
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