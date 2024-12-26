import { Button } from "@/components/ui/button";
import { Lead } from "@/types/crm";
import { Download, FileSpreadsheet, Trash2 } from "lucide-react";

interface LeadsHeaderProps {
  selectedLeads: Lead[];
  onDeleteSelected: () => void;
  onExportCSV: () => void;
  onExportGoogleSheets: () => void;
}

export const LeadsHeader = ({
  selectedLeads,
  onDeleteSelected,
  onExportCSV,
  onExportGoogleSheets,
}: LeadsHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          Mes Leads Achetés
        </h1>
        <p className="text-muted-foreground mt-1">
          Gérez vos leads et suivez leur progression
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {selectedLeads.length > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onDeleteSelected}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Supprimer ({selectedLeads.length})
          </Button>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={onExportCSV}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Exporter CSV
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onExportGoogleSheets}
          className="gap-2"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Google Sheets
        </Button>
      </div>
    </div>
  );
};