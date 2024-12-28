import { Button } from "@/components/ui/button";
import { Filter, FileDown, Wallet } from "lucide-react";

interface LeadsHeaderProps {
  onToggleFilters: () => void;
  onExport: () => void;
  onPrepaidAccount: () => void;
}

export const LeadsHeader = ({ onToggleFilters, onExport, onPrepaidAccount }: LeadsHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          Nouveaux Leads
        </h1>
        <p className="text-muted-foreground">
          Découvrez et achetez de nouveaux leads qualifiés
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-primary/20"
          onClick={onToggleFilters}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtres
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-primary/20"
          onClick={onExport}
        >
          <FileDown className="w-4 h-4 mr-2" />
          Exporter
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={onPrepaidAccount}
        >
          <Wallet className="w-4 h-4 mr-2" />
          Recharger
        </Button>
      </div>
    </div>
  );
};