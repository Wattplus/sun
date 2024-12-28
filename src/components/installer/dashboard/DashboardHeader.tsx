import { Button } from "@/components/ui/button";
import { Search, Download, Bell, Settings } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function DashboardHeader() {
  const { toast } = useToast();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const currentDate = format(new Date(), "EEEE d MMMM yyyy", { locale: fr });
  
  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "Fonctionnalité en cours de développement",
    });
  };

  const handleSettings = () => {
    toast({
      title: "Paramètres",
      description: "Fonctionnalité en cours de développement",
    });
  };

  const handleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleExport = () => {
    toast({
      title: "Export",
      description: "Fonctionnalité en cours de développement",
    });
  };
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-primary/10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-white">
          WattPlus - Tableau de Bord
        </h1>
        <p className="text-muted-foreground mt-1">{currentDate}</p>
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
          className="rounded-full hover:bg-primary/10"
          onClick={handleNotifications}
        >
          <Bell className="h-4 w-4" />
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