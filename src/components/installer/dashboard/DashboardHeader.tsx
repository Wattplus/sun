import { Button } from "@/components/ui/button";
import { Search, Download, Bell, Settings } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";

export function DashboardHeader() {
  const currentDate = format(new Date(), "EEEE d MMMM yyyy", { locale: fr });
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-primary/10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          WattPlus - Tableau de Bord Administratif
        </h1>
        <p className="text-muted-foreground mt-1">{currentDate}</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2"
      >
        <Button variant="outline" size="icon" className="rounded-full">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full">
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="gap-2">
          <Search className="h-4 w-4" />
          Rechercher
        </Button>
        <Button variant="default" className="gap-2">
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </motion.div>
    </div>
  );
}