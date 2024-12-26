import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LeadsFiltersProps {
  filters: {
    status: string;
    projectType: string;
    city: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

export const LeadsFilters = ({ filters, onFilterChange }: LeadsFiltersProps) => {
  return (
    <div className="flex gap-4 mb-4">
      <Select
        value={filters.status}
        onValueChange={(value) => onFilterChange('status', value)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filtrer par statut" />
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
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Type de projet" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les types</SelectItem>
          <SelectItem value="residential">Résidentiel</SelectItem>
          <SelectItem value="professional">Professionnel</SelectItem>
        </SelectContent>
      </Select>

      <input
        type="text"
        placeholder="Rechercher par ville"
        className="px-3 py-2 rounded-md border border-input bg-background"
        value={filters.city}
        onChange={(e) => onFilterChange('city', e.target.value)}
      />
    </div>
  );
};