import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus, Trash2 } from "lucide-react";

interface InstallerHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNewInstaller: () => void;
  selectedCount: number;
  onDeleteSelected: () => void;
}

export const InstallerHeader = ({ 
  searchTerm, 
  onSearchChange, 
  onNewInstaller,
  selectedCount,
  onDeleteSelected
}: InstallerHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1 max-w-sm">
        <Input
          placeholder="Rechercher un installateur..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-background"
        />
      </div>
      <div className="flex gap-2">
        {selectedCount > 0 && (
          <Button 
            variant="destructive" 
            onClick={onDeleteSelected}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Supprimer ({selectedCount})
          </Button>
        )}
        <Button onClick={onNewInstaller} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Nouvel installateur
        </Button>
      </div>
    </div>
  );
};