import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface LeadAgeTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const LeadAgeTabs = ({ activeTab, onTabChange }: LeadAgeTabsProps) => {
  return (
    <Card className="p-1 border-primary/20 bg-background/50 backdrop-blur-sm">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid grid-cols-4 w-full bg-transparent">
          <TabsTrigger 
            value="new" 
            className="relative data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <div className="flex flex-col items-center gap-1 py-1">
              <span className="font-medium">Nouveaux leads</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">moins de 15 jours</span>
                <span className="px-2 py-0.5 bg-primary/10 rounded text-sm font-semibold text-primary">
                  26€
                </span>
              </div>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="15days"
            className="relative data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <div className="flex flex-col items-center gap-1 py-1">
              <span className="font-medium">15+ jours</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">15-30 jours</span>
                <span className="px-2 py-0.5 bg-primary/10 rounded text-sm font-semibold text-primary">
                  21€
                </span>
              </div>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="30days"
            className="relative data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <div className="flex flex-col items-center gap-1 py-1">
              <span className="font-medium">30+ jours</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">30-45 jours</span>
                <span className="px-2 py-0.5 bg-primary/10 rounded text-sm font-semibold text-primary">
                  19€
                </span>
              </div>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="45days"
            className="relative data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <div className="flex flex-col items-center gap-1 py-1">
              <span className="font-medium">45+ jours</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">plus de 45 jours</span>
                <span className="px-2 py-0.5 bg-primary/10 rounded text-sm font-semibold text-primary">
                  15€
                </span>
              </div>
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </Card>
  );
};