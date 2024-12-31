import { Button } from "@/components/ui/button";
import { Filter, CreditCard, Download } from "lucide-react";

interface LeadsHeaderProps {
  onToggleFilters: () => void;
  onPrepaidAccount: () => void;
  onExport: () => void;
}

export const LeadsHeader = ({ onToggleFilters, onPrepaidAccount, onExport }: LeadsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-primary">Nouveaux Leads</h1>
        <p className="text-muted-foreground mt-1">
          Découvrez les dernières opportunités commerciales
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleFilters}
          className="text-muted-foreground hover:text-primary"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          className="text-muted-foreground hover:text-primary"
        >
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>

        <Button
          variant="default"
          size="sm"
          onClick={onPrepaidAccount}
          className="bg-primary hover:bg-primary/90"
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Recharger mon compte
        </Button>
      </div>
    </div>
  );
};