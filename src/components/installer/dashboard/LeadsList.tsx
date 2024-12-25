import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Euro, ChevronRight, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Lead } from "@/types/crm";

interface LeadsListProps {
  leads: Lead[];
}

export const LeadsList = ({ leads }: LeadsListProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [projectType, setProjectType] = useState("all");

  const handleBuyLead = async (leadId: string, type: "mutualise" | "exclusif") => {
    try {
      const priceId = type === 'exclusif' 
        ? 'price_1QZyKUFOePj4Hv47qEFQ1KzF' 
        : 'price_1QZyJpFOePj4Hv47sd76eDOz';

      const response = await fetch("https://dqzsycxxgltztufrhams.supabase.co/functions/v1/create-lead-checkout", {
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

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la session de paiement");
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Erreur d'achat:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'achat du lead.",
        variant: "destructive",
      });
    }
  };

  const filteredLeads = leads.filter(lead => {
    if (projectType !== "all" && lead.projectType !== projectType) return false;
    if (searchTerm && !lead.city.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <Card className="bg-background/50 backdrop-blur-md border-primary/20">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Leads Disponibles</h2>
          <Link to="/admin/marketplace">
            <Button variant="outline" size="sm">
              Voir tout
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher un lead..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={projectType} onValueChange={setProjectType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type de projet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les projets</SelectItem>
              <SelectItem value="solar">Panneaux Solaires</SelectItem>
              <SelectItem value="heat">Pompe à chaleur</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <Card key={lead.id} className="p-4 border border-primary/10 hover:border-primary/30 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {lead.projectType}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{lead.city} ({lead.postalCode})</span>
                    </div>
                    <div className="mt-2 text-sm">
                      Budget estimé: {lead.budget.toLocaleString()}€
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {lead.createdAt}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button 
                      size="sm"
                      onClick={() => handleBuyLead(lead.id, "mutualise")}
                      className="flex items-center gap-1 bg-primary hover:bg-primary/90"
                    >
                      <Euro className="h-4 w-4" />
                      19€ Mutualisé
                    </Button>
                    <Button 
                      size="sm"
                      variant="secondary"
                      onClick={() => handleBuyLead(lead.id, "exclusif")}
                      className="flex items-center gap-1"
                    >
                      <Euro className="h-4 w-4" />
                      35€ Exclusif
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};