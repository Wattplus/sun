import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { MapPin, Euro, Phone, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Lead } from "@/types/crm";

interface LeadsListProps {
  leads: Lead[];
}

export const LeadsList = ({ leads }: LeadsListProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const handleBuyLead = async (leadId: string, type: "mutualise" | "exclusif") => {
    try {
      const priceId = type === 'exclusif' 
        ? 'price_1QZyKUFOePj4Hv47qEFQ1KzF' 
        : 'price_1QZyJpFOePj4Hv47sd76eDOz';

      toast({
        title: "Achat en cours",
        description: "Traitement de votre demande...",
      });

      const response = await fetch(`https://dqzsycxxgltztufrhams.supabase.co/functions/v1/create-lead-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          leadId,
          type,
          priceId
        }),
      });

      if (!response.ok) throw new Error();

      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'achat du lead",
        variant: "destructive",
      });
    }
  };

  const handleContact = (method: "phone" | "email") => {
    toast({
      title: "Contact",
      description: `La fonction de ${method === "phone" ? "téléphone" : "email"} sera bientôt disponible`,
    });
  };

  const filteredLeads = leads.filter(lead => 
    lead.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Leads Disponibles</h2>
        <Input
          placeholder="Rechercher par ville..."
          className="max-w-[200px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[400px]">
        <div className="space-y-3">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Badge variant="secondary" className="mb-2">
                    {lead.projectType}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {lead.city}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Euro className="h-4 w-4" />
                    Budget: {lead.budget.toLocaleString()}€
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" onClick={() => handleContact("phone")}>
                      <Phone className="h-4 w-4 mr-1" />
                      Appeler
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleContact("email")}>
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button 
                    size="sm"
                    onClick={() => handleBuyLead(lead.id, "mutualise")}
                  >
                    19€ Mutualisé
                  </Button>
                  <Button 
                    size="sm"
                    variant="secondary"
                    onClick={() => handleBuyLead(lead.id, "exclusif")}
                  >
                    35€ Exclusif
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};