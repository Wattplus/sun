import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface LeadAgeTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const LeadAgeTabs = ({ activeTab, onTabChange }: LeadAgeTabsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="w-full md:w-auto bg-background/50 border border-primary/10">
          <TabsTrigger 
            value="new"
            className="flex-1 md:flex-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Nouveaux
          </TabsTrigger>
          <TabsTrigger 
            value="15days"
            className="flex-1 md:flex-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            15+ jours
          </TabsTrigger>
          <TabsTrigger 
            value="30days"
            className="flex-1 md:flex-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            30+ jours
          </TabsTrigger>
          <TabsTrigger 
            value="45days"
            className="flex-1 md:flex-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            45+ jours
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </motion.div>
  );
};