import { Button } from "@/components/ui/button";
import { Filter, Download, Wallet } from "lucide-react";

interface LeadsHeaderProps {
  onToggleFilters: () => void;
  onPrepaidAccount: () => void;
}

export const LeadsHeader = ({
  onToggleFilters,
  onPrepaidAccount,
}: LeadsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Leads disponibles</h1>
        <p className="text-muted-foreground">
          Découvrez les nouveaux leads disponibles à l'achat
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleFilters}
          className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtres
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onPrepaidAccount}
          className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Compte prépayé
        </Button>
      </div>
    </div>
  );
};