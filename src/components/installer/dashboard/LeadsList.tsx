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

  const handleContact = async (leadId: string, type: 'mutualise' | 'exclusif') => {
    try {
      const priceId = type === 'exclusif' 
        ? 'price_1QZyKUFOePj4Hv47qEFQ1KzF' 
        : 'price_1QZyJpFOePj4Hv47sd76eDOz';

      toast({
        title: "Achat en cours",
        description: `Accès aux informations du lead...`,
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
        description: `Une erreur est survenue lors de l'achat du lead`,
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
                      onClick={() => handleContact(lead.id, 'mutualise')}
                      className="flex items-center gap-2"
                    >
                      <Euro className="h-4 w-4" />
                      Lead mutualisé - 19€
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleContact(lead.id, 'exclusif')}
                      className="flex items-center gap-2"
                    >
                      <Euro className="h-4 w-4" />
                      Lead exclusif - 35€
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