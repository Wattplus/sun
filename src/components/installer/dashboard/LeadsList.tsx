import { Lead } from "@/types/crm";
import { LeadCard } from "@/components/admin/marketplace/LeadCard";
import { EmptyLeadState } from "./EmptyLeadState";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface LeadsListProps {
  leads: Lead[];
}

export const LeadsList = ({ leads }: LeadsListProps) => {
  const [postalCodeFilter, setPostalCodeFilter] = useState("");
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<"asc" | "desc" | "">("");

  // Filtrer les leads qui n'ont pas encore été achetés
  let availableLeads = leads.filter(lead => !lead.purchasedBy?.length);

  // Appliquer les filtres
  if (postalCodeFilter) {
    availableLeads = availableLeads.filter(lead => 
      lead.postalCode.startsWith(postalCodeFilter)
    );
  }

  if (projectTypeFilter) {
    availableLeads = availableLeads.filter(lead => 
      lead.projectType === projectTypeFilter
    );
  }

  if (priceFilter) {
    availableLeads.sort((a, b) => {
      if (priceFilter === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  if (availableLeads.length === 0) {
    return <EmptyLeadState />;
  }

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block text-muted-foreground">
              Code postal
            </label>
            <Input
              placeholder="Filtrer par code postal"
              value={postalCodeFilter}
              onChange={(e) => setPostalCodeFilter(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block text-muted-foreground">
              Type de projet
            </label>
            <Select value={projectTypeFilter} onValueChange={setProjectTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les types</SelectItem>
                <SelectItem value="residential">Résidentiel</SelectItem>
                <SelectItem value="commercial">Professionnel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block text-muted-foreground">
              Prix
            </label>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par prix" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Par défaut</SelectItem>
                <SelectItem value="asc">Prix croissant</SelectItem>
                <SelectItem value="desc">Prix décroissant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableLeads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            onPurchase={() => {}}
            subscriptionTier="free"
          />
        ))}
      </div>
    </div>
  );
};