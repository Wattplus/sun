import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileDown, Plus, Search } from "lucide-react";

interface LeadHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onExportClick: () => void;
  onNewLeadClick: () => void;
}

export const LeadHeader = ({
  searchTerm,
  onSearchChange,
  onExportClick,
  onNewLeadClick,
}: LeadHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Rechercher un lead..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background/60"
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onExportClick}
          className="flex-1 sm:flex-none whitespace-nowrap"
        >
          <FileDown className="h-4 w-4 mr-2" />
          Exporter
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={onNewLeadClick}
          className="flex-1 sm:flex-none whitespace-nowrap"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau lead
        </Button>
      </div>
    </div>
  );
};