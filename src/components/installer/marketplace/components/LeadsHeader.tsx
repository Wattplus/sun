import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Download } from "lucide-react";

interface LeadsHeaderProps {
  onToggleFilters: () => void;
  onPrepaidAccount: () => void;
  onExport: () => void;
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const LeadsHeader = ({ 
  onToggleFilters, 
  onPrepaidAccount, 
  onExport,
  activeTab,
  onTabChange
}: LeadsHeaderProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leads Disponibles</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onToggleFilters}>
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
          <Button variant="outline" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="new" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Nouveaux
            <span className="ml-2 text-xs bg-primary/10 px-2 py-1 rounded">26€</span>
          </TabsTrigger>
          <TabsTrigger value="15days" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            15+ jours
            <span className="ml-2 text-xs bg-primary/10 px-2 py-1 rounded">21€</span>
          </TabsTrigger>
          <TabsTrigger value="30days" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            30+ jours
            <span className="ml-2 text-xs bg-primary/10 px-2 py-1 rounded">19€</span>
          </TabsTrigger>
          <TabsTrigger value="45days" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            45+ jours
            <span className="ml-2 text-xs bg-primary/10 px-2 py-1 rounded">15€</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};