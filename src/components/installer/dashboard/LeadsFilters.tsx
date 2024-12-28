import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-4">
      <div className={`flex flex-wrap gap-4 ${isMobile ? 'flex-col' : ''}`}>
        <Select value={projectTypeFilter} onValueChange={onProjectTypeChange}>
          <SelectTrigger className={`bg-background/60 border-primary/20 ${isMobile ? 'w-full' : 'w-[180px]'}`}>
            <SelectValue placeholder="Type de projet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="residential">Résidentiel</SelectItem>
            <SelectItem value="professional">Professionnel</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onDepartmentSelect}>
          <SelectTrigger className={`bg-background/60 border-primary/20 ${isMobile ? 'w-full' : 'w-[180px]'}`}>
            <SelectValue placeholder="Département" />
          </SelectTrigger>
          <SelectContent>
            {availableDepartments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                Département {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priceFilter} onValueChange={onPriceFilterChange}>
          <SelectTrigger className={`bg-background/60 border-primary/20 ${isMobile ? 'w-full' : 'w-[180px]'}`}>
            <SelectValue placeholder="Prix" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Par défaut</SelectItem>
            <SelectItem value="asc">Prix croissant</SelectItem>
            <SelectItem value="desc">Prix décroissant</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
  );
};