import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { mockPurchasedLeads } from "../dashboard/mockPurchasedLeads";
import { Phone, Mail, MapPin, FileText, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PurchasedLeadsPage = () => {
  const { toast } = useToast();

  const handleContact = (type: string, value: string) => {
    if (type === 'phone') {
      window.location.href = `tel:${value}`;
    } else if (type === 'email') {
      window.location.href = `mailto:${value}`;
    }
    toast({
      title: "Contact",
      description: `Contact initié via ${type}`,
    });
  };

  const handleNotes = (leadId: string) => {
    toast({
      title: "Notes",
      description: "Fonctionnalité de notes à venir",
    });
  };

  const handleMessage = (leadId: string) => {
    toast({
      title: "Message",
      description: "Fonctionnalité de messagerie à venir",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Mes Leads Achetés</h1>
      <Card className="p-6">
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary/5">
                <TableHead>Contact</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead>Projet</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPurchasedLeads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-primary/5">
                  <TableCell>
                    <div className="space-y-2">
                      <div className="font-medium">{`${lead.firstName} ${lead.lastName}`}</div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleContact('phone', lead.phone)}
                          className="gap-2"
                        >
                          <Phone className="h-4 w-4" />
                          {lead.phone}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleContact('email', lead.email)}
                          className="gap-2"
                        >
                          <Mail className="h-4 w-4" />
                          {lead.email}
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-1" />
                      <div>
                        <div>{lead.address}</div>
                        <div className="text-sm text-muted-foreground">{`${lead.postalCode} ${lead.city}`}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{lead.projectType}</TableCell>
                  <TableCell>{lead.budget.toLocaleString()}€</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleNotes(lead.id)}
                        className="gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Notes
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMessage(lead.id)}
                        className="gap-2"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Message
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
    </div>
  );
};