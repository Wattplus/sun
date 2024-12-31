import { Button } from "@/components/ui/button";
import { Filter, Download } from "lucide-react";

interface LeadsHeaderProps {
  onToggleFilters: () => void;
  onPrepaidAccount: () => void;
  onExport: () => void;
}

export const LeadsHeader = ({ 
  onToggleFilters, 
  onPrepaidAccount, 
  onExport,
}: LeadsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Leads Disponibles</h1>
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onToggleFilters}>
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>
        <Button variant="outline" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>
    </div>
  );
};