import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Euro, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Lead } from "@/types/crm";

interface LeadsListProps {
  leads: Lead[];
}

export const LeadsList = ({ leads }: LeadsListProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const handleContact = async (leadIds: string[], type: 'mutualise' | 'exclusif') => {
    try {
      const priceId = type === 'exclusif' 
        ? 'price_1QZyKUFOePj4Hv47qEFQ1KzF' 
        : 'price_1QZyJpFOePj4Hv47sd76eDOz';

      toast({
        title: "Achat en cours",
        description: `Achat de ${leadIds.length} lead(s)...`,
      });

      const response = await fetch(`https://dqzsycxxgltztufrhams.supabase.co/functions/v1/create-lead-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          leadIds,
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
        description: `Une erreur est survenue lors de l'achat des leads`,
        variant: "destructive",
      });
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.postalCode.includes(searchTerm)
  );

  const maskSensitiveInfo = (text: string) => "•".repeat(text.length);

  const toggleLeadSelection = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Rechercher par prénom ou code postal..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        {selectedLeads.length > 0 && (
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => handleContact(selectedLeads, 'mutualise')}
              className="flex items-center gap-2"
            >
              <Euro className="h-4 w-4" />
              Acheter {selectedLeads.length} leads mutualisés ({19 * selectedLeads.length}€)
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleContact(selectedLeads, 'exclusif')}
              className="flex items-center gap-2"
            >
              <Euro className="h-4 w-4" />
              Acheter {selectedLeads.length} leads exclusifs ({35 * selectedLeads.length}€)
            </Button>
          </div>
        )}
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <Checkbox
                    checked={selectedLeads.includes(lead.id)}
                    onCheckedChange={() => toggleLeadSelection(lead.id)}
                    className="mt-1"
                  />
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
                        onClick={() => handleContact([lead.id], 'mutualise')}
                        className="flex items-center gap-2"
                      >
                        <Euro className="h-4 w-4" />
                        Lead mutualisé - 19€
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleContact([lead.id], 'exclusif')}
                        className="flex items-center gap-2"
                      >
                        <Euro className="h-4 w-4" />
                        Lead exclusif - 35€
                      </Button>
                    </div>
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