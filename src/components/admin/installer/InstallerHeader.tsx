import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Plus } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface InstallerHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNewInstaller: () => void;
}

export const InstallerHeader = ({ 
  searchTerm, 
  onSearchChange, 
  onNewInstaller 
}: InstallerHeaderProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-between sm:items-center">
      <h2 className="text-xl font-semibold bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] bg-clip-text text-transparent">
        Gestion des Installateurs
      </h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 sm:w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9b87f5] h-4 w-4" />
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white/10 border-[#9b87f5]/20 text-white placeholder:text-white/50"
          />
        </div>
        {!isMobile && (
          <Button 
            variant="outline" 
            className="border-[#9b87f5]/20 hover:border-[#9b87f5]/40 hover:bg-[#9b87f5]/10"
          >
            <Download className="h-4 w-4 mr-2 text-[#9b87f5]" />
            Exporter CSV
          </Button>
        )}
        <Button 
          onClick={onNewInstaller}
          className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          {isMobile ? "Nouveau" : "Nouvel Installateur"}
        </Button>
      </div>
    </div>
  );
};