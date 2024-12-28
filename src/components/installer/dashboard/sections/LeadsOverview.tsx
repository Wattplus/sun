import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Calendar, ArrowUpRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const leads = [
  {
    name: "Sophie Laurent",
    phone: "06 12 34 56 78",
    city: "Toulouse",
    status: "En cours",
    date: "Il y a 2h",
    email: "sophie@example.com"
  },
  {
    name: "Pierre Martin",
    phone: "07 98 76 54 32",
    city: "Bordeaux",
    status: "Qualifié",
    date: "Il y a 4h",
    email: "pierre@example.com"
  },
  {
    name: "Marie Dubois",
    phone: "06 54 32 10 98",
    city: "Lyon",
    status: "Installation",
    date: "Il y a 6h",
    email: "marie@example.com"
  }
];

export function LeadsOverview() {
  const { toast } = useToast();

  const handlePhoneClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
    toast({
      title: "Appel en cours",
      description: `Appel vers ${phone}`,
    });
  };

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
    toast({
      title: "Email",
      description: `Ouverture de l'email vers ${email}`,
    });
  };

  const handleCalendarClick = (name: string) => {
    toast({
      title: "Calendrier",
      description: `Planification d'un rendez-vous avec ${name}`,
    });
  };

  const handleDetailsClick = (name: string) => {
    toast({
      title: "Détails",
      description: `Affichage des détails pour ${name}`,
    });
  };

  return (
    <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
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
            <TableRow key={lead.name} className="group hover:bg-primary/5">
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
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
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handlePhoneClick(lead.phone)}
                    className="hover:bg-primary/10"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEmailClick(lead.email)}
                    className="hover:bg-primary/10"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleCalendarClick(lead.name)}
                    className="hover:bg-primary/10"
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDetailsClick(lead.name)}
                    className="hover:bg-primary/10"
                  >
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