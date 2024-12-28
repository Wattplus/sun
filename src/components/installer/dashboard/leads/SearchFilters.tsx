import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export const SearchFilters = ({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: SearchFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Rechercher un lead..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Tous les statuts" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="nouveau">Nouveau</SelectItem>
          <SelectItem value="contacte">Contacté</SelectItem>
          <SelectItem value="devis_envoye">Devis envoyé</SelectItem>
          <SelectItem value="rdv_planifie">RDV planifié</SelectItem>
          <SelectItem value="negociation">En négociation</SelectItem>
          <SelectItem value="signe">Signé</SelectItem>
          <SelectItem value="perdu">Perdu</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};