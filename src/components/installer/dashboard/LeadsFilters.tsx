import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    <div className="flex flex-wrap gap-4 items-center">
      <Select value={projectTypeFilter} onValueChange={onProjectTypeChange}>
        <SelectTrigger className="w-[180px] bg-background/60 border-primary/20">
          <SelectValue placeholder="Type de projet" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les types</SelectItem>
          <SelectItem value="residential">Résidentiel</SelectItem>
          <SelectItem value="professional">Professionnel</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onDepartmentSelect}>
        <SelectTrigger className="w-[180px] bg-background/60 border-primary/20">
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