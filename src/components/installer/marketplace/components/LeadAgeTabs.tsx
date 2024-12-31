import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LeadAgeTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const LeadAgeTabs = ({ activeTab, onTabChange }: LeadAgeTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger 
          value="new" 
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Nouveaux
          <span className="ml-2 text-xs bg-primary/10 px-2 py-1 rounded">26€</span>
        </TabsTrigger>
        <TabsTrigger 
          value="15days" 
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          15+ jours
          <span className="ml-2 text-xs bg-primary/10 px-2 py-1 rounded">21€</span>
        </TabsTrigger>
        <TabsTrigger 
          value="30days" 
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          30+ jours
          <span className="ml-2 text-xs bg-primary/10 px-2 py-1 rounded">19€</span>
        </TabsTrigger>
        <TabsTrigger 
          value="45days" 
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          45+ jours
          <span className="ml-2 text-xs bg-primary/10 px-2 py-1 rounded">15€</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};