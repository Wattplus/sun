import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InstallerLeadStatus } from "@/types/crm";
import { Search, Filter } from "lucide-react";

interface LeadsFiltersProps {
  filters: {
    status: 'all' | InstallerLeadStatus;
    projectType: string;
    city: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

export const LeadsFilters = ({ filters, onFilterChange }: LeadsFiltersProps) => {
  return (
    <div className="glass-panel p-4 rounded-lg space-y-4">
      <div className="flex items-center gap-2 text-primary">
        <Filter className="h-5 w-5" />
        <h2 className="font-medium">Filtres</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher par ville..."
            value={filters.city}
            onChange={(e) => onFilterChange('city', e.target.value)}
            className="pl-10 bg-background/50"
          />
        </div>
        
        <Select
          value={filters.status}
          onValueChange={(value) => onFilterChange('status', value)}
        >
          <SelectTrigger className="bg-background/50">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="nouveau">Nouveau lead</SelectItem>
            <SelectItem value="contacte">Contacté</SelectItem>
            <SelectItem value="devis_envoye">Devis envoyé</SelectItem>
            <SelectItem value="rdv_planifie">RDV planifié</SelectItem>
            <SelectItem value="negociation">En négociation</SelectItem>
            <SelectItem value="signe">Signé</SelectItem>
            <SelectItem value="perdu">Perdu</SelectItem>
          </SelectContent>
        </Select>
        
        <Select
          value={filters.projectType}
          onValueChange={(value) => onFilterChange('projectType', value)}
        >
          <SelectTrigger className="bg-background/50">
            <SelectValue placeholder="Type de projet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="residential">Résidentiel</SelectItem>
            <SelectItem value="professional">Professionnel</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};