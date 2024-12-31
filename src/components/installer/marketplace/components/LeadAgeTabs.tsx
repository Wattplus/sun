import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Clock, Sparkles, Timer, History } from "lucide-react";

interface LeadAgeTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const LeadAgeTabs = ({ activeTab, onTabChange }: LeadAgeTabsProps) => {
  return (
    <Card className="p-4 border-2 border-primary/20 bg-background/80 backdrop-blur-md shadow-xl">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full bg-transparent">
          <TabsTrigger 
            value="new" 
            className="relative group data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/5"
          >
            <div className="flex flex-col items-center gap-3 py-4 w-full">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">Nouveaux leads</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-sm text-muted-foreground font-medium">moins de 15 jours</span>
                <span className="px-4 py-1.5 bg-primary text-white rounded-full text-lg font-bold shadow-lg group-hover:scale-110 transition-transform">
                  26€
                </span>
              </div>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="15days"
            className="relative group data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/5"
          >
            <div className="flex flex-col items-center gap-3 py-4 w-full">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">15+ jours</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-sm text-muted-foreground font-medium">15-30 jours</span>
                <span className="px-4 py-1.5 bg-primary/90 text-white rounded-full text-lg font-bold shadow-lg group-hover:scale-110 transition-transform">
                  21€
                </span>
              </div>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="30days"
            className="relative group data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/5"
          >
            <div className="flex flex-col items-center gap-3 py-4 w-full">
              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">30+ jours</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-sm text-muted-foreground font-medium">30-45 jours</span>
                <span className="px-4 py-1.5 bg-primary/80 text-white rounded-full text-lg font-bold shadow-lg group-hover:scale-110 transition-transform">
                  19€
                </span>
              </div>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="45days"
            className="relative group data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/5"
          >
            <div className="flex flex-col items-center gap-3 py-4 w-full">
              <div className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">45+ jours</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-sm text-muted-foreground font-medium">plus de 45 jours</span>
                <span className="px-4 py-1.5 bg-primary/70 text-white rounded-full text-lg font-bold shadow-lg group-hover:scale-110 transition-transform">
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