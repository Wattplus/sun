import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface LeadsFiltersProps {
  availableDepartments: string[];
  selectedDepartments: string[];
  projectTypeFilter: string;
  priceFilter: "default" | "asc" | "desc";
  onDepartmentSelect: (department: string) => void;
  onDepartmentRemove: (department: string) => void;
  onProjectTypeChange: (value: string) => void;
  onPriceFilterChange: (value: "default" | "asc" | "desc") => void;
}

export const LeadsFilters = ({
  availableDepartments,
  selectedDepartments,
  projectTypeFilter,
  priceFilter,
  onDepartmentSelect,
  onDepartmentRemove,
  onProjectTypeChange,
  onPriceFilterChange
}: LeadsFiltersProps) => {
  return (
    <Card className="p-4 bg-background/40 border-primary/20">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Départements
          </label>
          <Select onValueChange={onDepartmentSelect}>
            <SelectTrigger className="bg-background/60 border-primary/20">
              <SelectValue placeholder="Sélectionner un département" />
            </SelectTrigger>
            <SelectContent>
              {availableDepartments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  Département {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2">
            {selectedDepartments.map((dept) => (
              <Badge 
                key={dept}
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1"
              >
                Dép. {dept}
                <X 
                  className="w-3 h-3 cursor-pointer hover:text-white" 
                  onClick={() => onDepartmentRemove(dept)}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Type de projet
          </label>
          <Select value={projectTypeFilter} onValueChange={onProjectTypeChange}>
            <SelectTrigger className="bg-background/60 border-primary/20">
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="residential">Résidentiel</SelectItem>
              <SelectItem value="professional">Professionnel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Prix
          </label>
          <Select value={priceFilter} onValueChange={onPriceFilterChange}>
            <SelectTrigger className="bg-background/60 border-primary/20">
              <SelectValue placeholder="Par défaut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Par défaut</SelectItem>
              <SelectItem value="asc">Prix croissant</SelectItem>
              <SelectItem value="desc">Prix décroissant</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};