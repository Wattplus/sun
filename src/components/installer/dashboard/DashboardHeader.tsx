import { fr } from "date-fns/locale";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Download, Filter, Search, Settings } from "lucide-react";
import { useState } from "react";

export const DashboardHeader = () => {
  const { toast } = useToast();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState("7j");
  const currentDate = format(new Date(), "EEEE d MMMM yyyy", { locale: fr });
  
  const handleNotifications = () => {
    console.log("Notifications clicked");
    toast({
      title: "Notifications",
      description: "Vous avez 3 nouvelles notifications",
      duration: 5000,
      variant: "default",
    });
  };

  const handleSettings = () => {
    console.log("Settings clicked");
    toast({
      title: "Paramètres",
      description: "Accès aux paramètres du compte",
      duration: 5000,
      variant: "default",
    });
  };

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Search clicked");
    setIsSearchOpen(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsSearchOpen(false);
    }, 200);
  };

  const handleExport = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Export clicked");
    toast({
      title: "Export des données",
      description: "L'export de vos données est en cours...",
      duration: 5000,
      variant: "default",
    });
  };

  const handleFilterChange = (value: string) => {
    setFilterPeriod(value);
    console.log("Filter changed to:", value);
    toast({
      title: "Période modifiée",
      description: `Les données sont maintenant filtrées pour : ${value}`,
      duration: 5000,
      variant: "default",
    });
  };

  const handleFilter = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Filter clicked");
    toast({
      title: "Filtres",
      description: "Ouverture des filtres avancés",
      duration: 5000,
      variant: "default",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Tableau de bord
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="icon"
            className="border-primary/20"
            onClick={handleNotifications}
          >
            <Bell className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-primary/20"
            onClick={handleSettings}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="w-full sm:w-auto flex flex-wrap gap-2">
          <Select value={filterPeriod} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background border-primary/20">
              <SelectValue placeholder="Sélectionner la période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7j">7 derniers jours</SelectItem>
              <SelectItem value="30j">30 derniers jours</SelectItem>
              <SelectItem value="90j">3 derniers mois</SelectItem>
              <SelectItem value="365j">12 derniers mois</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {isSearchOpen ? (
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 w-full sm:w-[200px] bg-background border-primary/20"
                autoFocus
                onBlur={handleSearchBlur}
              />
            </div>
          ) : (
            <Button
              variant="outline"
              size="icon"
              className="border-primary/20"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            variant="outline"
            size="icon"
            className="border-primary/20"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="border-primary/20"
            onClick={handleFilter}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
