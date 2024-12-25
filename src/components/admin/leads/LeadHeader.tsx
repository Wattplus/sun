import { Search, Download, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold bg-gradient-to-r from-[#1EAEDB] to-[#33C3F0] bg-clip-text text-transparent">
        Gestion des Leads
      </h2>
      <div className="flex gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1EAEDB] h-4 w-4" />
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-[300px] bg-white/10 border-[#33C3F0]/20 text-white placeholder:text-white/50"
          />
        </div>
        <Button
          variant="outline"
          onClick={onExportClick}
          className="border-[#33C3F0]/20 hover:border-[#33C3F0]/40 hover:bg-[#33C3F0]/10"
        >
          <Download className="h-4 w-4 mr-2 text-[#1EAEDB]" />
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
  );
};