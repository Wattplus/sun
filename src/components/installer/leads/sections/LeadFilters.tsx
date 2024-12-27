import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

export const LeadFilters = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher un lead..."
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="flex gap-2 items-center">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type de projet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="residential">Résidentiel</SelectItem>
            <SelectItem value="professional">Professionnel</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Département" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="75">Paris (75)</SelectItem>
            <SelectItem value="69">Rhône (69)</SelectItem>
            <SelectItem value="13">Bouches-du-Rhône (13)</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};