import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, Trash2 } from "lucide-react";
import { Lead } from "@/types/crm";

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
  onExportGoogleSheets
}: LeadsHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
        Mes Leads Achetés
      </h1>
      <div className="flex gap-4">
        {selectedLeads.length > 0 && (
          <Button
            variant="outline"
            onClick={onDeleteSelected}
            className="gap-2 border-destructive/20 hover:border-destructive/40 hover:bg-destructive/10 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            Supprimer ({selectedLeads.length})
          </Button>
        )}
        <Button
          variant="outline"
          onClick={onExportCSV}
          className="gap-2 border-primary/20 hover:border-primary/40 hover:bg-primary/10"
        >
          <Download className="h-4 w-4 text-primary" />
          Exporter CSV
        </Button>
        <Button
          variant="outline"
          onClick={onExportGoogleSheets}
          className="gap-2 border-primary/20 hover:border-primary/40 hover:bg-primary/10"
        >
          <FileSpreadsheet className="h-4 w-4 text-primary" />
          Google Sheets
        </Button>
      </div>
    </div>
  );
};