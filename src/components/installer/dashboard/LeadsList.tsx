import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { MapPin, Euro, Phone, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Lead } from "@/types/crm";

interface LeadsListProps {
  leads: Lead[];
}

export const LeadsList = ({ leads }: LeadsListProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const handleContact = async (leadId: string, method: "phone" | "email") => {
    try {
      const priceId = 'price_1QZyJpFOePj4Hv47sd76eDOz';
      
      toast({
        title: "Achat en cours",
        description: `Accès aux informations de ${method === "phone" ? "téléphone" : "email"}...`,
      });

      const response = await fetch(`https://dqzsycxxgltztufrhams.supabase.co/functions/v1/create-contact-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          leadId,
          contactType: method,
          priceId
        }),
      });

      if (!response.ok) throw new Error();

      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      toast({
        title: "Erreur",
        description: `Une erreur est survenue lors de l'achat des informations de contact`,
        variant: "destructive",
      });
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.postalCode.includes(searchTerm)
  );

  const maskSensitiveInfo = (text: string) => "•".repeat(text.length);

  return (
    <Card className="p-4">
      <div className="mb-4">
        <Input
          placeholder="Rechercher par prénom ou code postal..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{lead.firstName}</span>
                    <span className="text-muted-foreground">{maskSensitiveInfo(lead.lastName)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{lead.postalCode}</span>
                    <Lock className="h-3 w-3 text-orange-500" aria-label="Adresse complète masquée" />
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Euro className="h-4 w-4" />
                    Budget: {lead.budget.toLocaleString()}€
                  </div>

                  <div className="text-sm text-muted-foreground mt-2">
                    <strong>Type de projet:</strong>
                    <p>{lead.projectType}</p>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleContact(lead.id, "phone")}
                      className="flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4" />
                      <Lock className="h-3 w-3" />
                      9€ Appeler
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleContact(lead.id, "email")}
                      className="flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      <Lock className="h-3 w-3" />
                      9€ Email
                    </Button>
                  </div>
                </div>

                <Button
                  variant="default"
                  onClick={() => handleContact(lead.id, "phone")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Acheter ce lead
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};