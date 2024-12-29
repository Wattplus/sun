import { Search, Download, Plus, FileSpreadsheet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#1EAEDB] to-[#33C3F0] bg-clip-text text-transparent">
            Gestion des Leads
          </h2>
          <p className="text-sm text-muted-foreground">
            Gérez et suivez vos leads commerciaux
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onExportClick}
            className="border-[#33C3F0]/20 hover:border-[#33C3F0]/40 hover:bg-[#33C3F0]/10"
          >
            <FileSpreadsheet className="h-4 w-4 mr-2 text-[#1EAEDB]" />
            Exporter CSV
          </Button>
          <Button
            onClick={onNewLeadClick}
            className="bg-[#1EAEDB] hover:bg-[#0FA0CE] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Lead
          </Button>
        </div>
      </div>

      <Separator className="bg-[#33C3F0]/20" />

      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1EAEDB] h-4 w-4" />
          <Input
            placeholder="Rechercher un lead..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white/10 border-[#33C3F0]/20 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>
    </div>
  );
};