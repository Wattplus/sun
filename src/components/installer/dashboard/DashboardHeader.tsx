import { Button } from "@/components/ui/button";
import { Search, Download, Bell, Settings, Filter } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function DashboardHeader() {
  const { toast } = useToast();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState("today");
  const currentDate = format(new Date(), "EEEE d MMMM yyyy", { locale: fr });
  
  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "Vous avez 3 nouvelles notifications",
      duration: 3000,
    });
  };

  const handleSettings = () => {
    toast({
      title: "Paramètres",
      description: "Accès aux paramètres du compte",
      duration: 3000,
    });
  };

  const handleSearch = () => {
    if (!isSearchOpen) {
      setIsSearchOpen(true);
    }
  };

  const handleExport = () => {
    toast({
      title: "Export des données",
      description: "L'export de vos données est en cours...",
      duration: 3000,
    });
  };

  const handleFilterChange = (value: string) => {
    setFilterPeriod(value);
    toast({
      title: "Période modifiée",
      description: `Les données sont maintenant filtrées pour : ${value}`,
      duration: 3000,
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filtres",
      description: "Ouverture des filtres avancés",
      duration: 3000,
    });
  };
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-primary/10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <p className="text-muted-foreground">{currentDate}</p>
        <div className="flex items-center gap-4">
          <Select value={filterPeriod} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px] bg-background/60 border-primary/20">
              <SelectValue placeholder="Sélectionner la période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full hover:bg-primary/10"
            onClick={handleFilter}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2"
      >
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-primary/10 relative"
          onClick={handleNotifications}
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-primary/10"
          onClick={handleSettings}
        >
          <Settings className="h-4 w-4" />
        </Button>
        {isSearchOpen ? (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher..."
              className="pl-10 w-[200px] bg-background border-primary/20"
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
            />
          </div>
        ) : (
          <Button 
            variant="ghost" 
            className="gap-2 hover:bg-primary/10"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
            Rechercher
          </Button>
        )}
        <Button 
          variant="outline" 
          className="gap-2 border-primary/20 hover:bg-primary/10"
          onClick={handleExport}
        >
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </motion.div>
    </div>
  );
}