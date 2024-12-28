import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function DashboardHeader() {
  const navigate = useNavigate();
  const currentDate = format(new Date(), "EEEE d MMMM yyyy", { locale: fr });
  
  const handleSearch = () => {
    navigate("/espace-installateur/leads");
    toast.info("Redirection vers la page de recherche des leads");
  };

  const handleExport = () => {
    toast.info("Export des données en cours...");
  };
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-border">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          WattPlus - Tableau de Bord Administratif
        </h1>
        <p className="text-muted-foreground mt-1">{currentDate}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" className="gap-2" onClick={handleSearch}>
          <Search className="h-4 w-4" />
          Rechercher un lead
        </Button>
        <Button variant="outline" className="gap-2" onClick={handleExport}>
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </div>
    </div>
  );
}