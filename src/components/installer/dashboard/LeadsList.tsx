import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Euro, Lock, Clock, ArrowRight, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Lead } from "@/types/crm";
import { calculateLeadPrice, formatPrice } from "@/utils/leadPricing";
import { Badge } from "@/components/ui/badge";
import { differenceInDays } from "date-fns";

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

  const getAgeLabel = (createdAt: string) => {
    const days = differenceInDays(new Date(), new Date(createdAt));
    if (days >= 30) return "Plus d'un mois";
    if (days >= 15) return "Plus de 15 jours";
    return "Nouveau";
  };

  const getTotalPrice = (type: 'mutualise' | 'exclusif') => {
    return selectedLeads.reduce((total, leadId) => {
      const lead = leads.find(l => l.id === leadId);
      if (!lead) return total;
      const prices = calculateLeadPrice(lead);
      return total + (type === 'mutualise' ? prices.mutualPrice : prices.exclusivePrice);
    }, 0);
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
              className="flex items-center gap-2 border-primary/50 hover:bg-primary/10"
            >
              <Euro className="h-4 w-4" />
              Acheter {selectedLeads.length} leads mutualisés ({formatPrice(getTotalPrice('mutualise'))})
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleContact(selectedLeads, 'exclusif')}
              className="flex items-center gap-2 border-primary/50 hover:bg-primary/10"
            >
              <Euro className="h-4 w-4" />
              Acheter {selectedLeads.length} leads exclusifs ({formatPrice(getTotalPrice('exclusif'))})
            </Button>
          </div>
        )}
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {filteredLeads.map((lead) => {
            const prices = calculateLeadPrice(lead);
            return (
              <Card key={lead.id} className="p-6 hover:shadow-lg transition-all duration-200">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-4 flex-1">
                    <Checkbox
                      checked={selectedLeads.includes(lead.id)}
                      onCheckedChange={() => toggleLeadSelection(lead.id)}
                      className="mt-1"
                    />
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-lg">{lead.firstName}</span>
                          <span className="text-muted-foreground ml-2">{maskSensitiveInfo(lead.lastName)}</span>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {getAgeLabel(lead.createdAt)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{lead.postalCode}</span>
                        <Lock className="h-3 w-3 text-orange-500" aria-label="Adresse complète masquée" />
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Euro className="h-4 w-4" />
                        <span className="font-semibold">Budget: {lead.budget.toLocaleString()}€</span>
                      </div>

                      <div className="text-sm">
                        <p className="font-medium mb-1">Type de projet:</p>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {lead.projectType}
                        </Badge>
                      </div>

                      <div className="flex gap-4 mt-4">
                        <Button 
                          size="lg" 
                          onClick={() => handleContact([lead.id], 'mutualise')}
                          className="flex-1 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                        >
                          <Euro className="h-4 w-4 mr-2" />
                          Lead mutualisé - {formatPrice(prices.mutualPrice)}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                        <Button 
                          size="lg" 
                          onClick={() => handleContact([lead.id], 'exclusif')}
                          className="flex-1 bg-primary hover:bg-primary/90"
                        >
                          <Crown className="h-4 w-4 mr-2" />
                          Lead exclusif - {formatPrice(prices.exclusivePrice)}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};