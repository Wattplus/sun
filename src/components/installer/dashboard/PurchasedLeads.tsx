import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Phone, Mail, MapPin, Euro } from "lucide-react";
import { Lead } from "@/types/crm";
import { useToast } from "@/components/ui/use-toast";

interface PurchasedLeadsProps {
  leads: Lead[];
}

export const PurchasedLeads = ({ leads }: PurchasedLeadsProps) => {
  const { toast } = useToast();

  const handleContact = (method: "phone" | "email", lead: Lead) => {
    toast({
      title: `Contact ${lead.firstName} ${lead.lastName}`,
      description: `Via ${method}: ${method === "phone" ? lead.phone : lead.email}`,
    });
  };

  return (
    <Card className="p-4">
      <h2 className="text-lg font-medium mb-4">Leads Achetés</h2>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {leads.map((lead) => (
            <Card key={lead.id} className="p-4 bg-background/50">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Badge variant="secondary" className="mb-2">
                    {lead.projectType}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {lead.city} ({lead.postalCode})
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Euro className="h-4 w-4" />
                    Budget: {lead.budget.toLocaleString()}€
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" onClick={() => handleContact("phone", lead)}>
                      <Phone className="h-4 w-4 mr-1" />
                      {lead.phone}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleContact("email", lead)}>
                      <Mail className="h-4 w-4 mr-1" />
                      {lead.email}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};