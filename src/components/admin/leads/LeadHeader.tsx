import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Plus } from "lucide-react";

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
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un lead..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background/50 border-primary/10"
        />
      </div>
      <div className="flex gap-3 w-full sm:w-auto">
        <Button
          variant="outline"
          className="flex-1 sm:flex-none border-primary/10 hover:bg-primary/5"
          onClick={onExportClick}
        >
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
        <Button
          className="flex-1 sm:flex-none"
          onClick={onNewLeadClick}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau lead
        </Button>
      </div>
    </div>
  );
};