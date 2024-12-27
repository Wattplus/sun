import { Button } from "@/components/ui/button";
import { Filter, Download, Wallet } from "lucide-react";
import { InstallerBreadcrumb } from "../../navigation/InstallerBreadcrumb";

interface LeadsHeaderProps {
  onToggleFilters: () => void;
  onExport: () => void;
  onPrepaidAccount: () => void;
}

export const LeadsHeader = ({ onToggleFilters, onExport, onPrepaidAccount }: LeadsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <InstallerBreadcrumb />
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          className="gap-2 bg-primary/10 hover:bg-primary/20 border-primary/20"
          onClick={onToggleFilters}
        >
          <Filter className="w-4 h-4" />
          Filtrer
        </Button>
        <Button 
          variant="outline" 
          className="gap-2 bg-primary/10 hover:bg-primary/20 border-primary/20" 
          onClick={onExport}
        >
          <Download className="w-4 h-4" />
          Exporter
        </Button>
        <Button
          variant="outline"
          className="gap-2 bg-primary/10 hover:bg-primary/20 border-primary/20"
          onClick={onPrepaidAccount}
        >
          <Wallet className="w-4 h-4" />
          Recharger
        </Button>
      </div>
    </div>
  );
};