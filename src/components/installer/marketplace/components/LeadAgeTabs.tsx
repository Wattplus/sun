import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Timer, History, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface LeadAgeTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const LeadAgeTabs = ({ activeTab, onTabChange }: LeadAgeTabsProps) => {
  return (
    <Card className="p-4 md:p-6 border-2 border-primary/20 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl shadow-2xl">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full bg-transparent h-auto p-0">
          {[
            {
              value: "new",
              label: "Nouveaux leads",
              subLabel: "moins de 15 jours",
              price: "26€",
              icon: Sparkles,
              gradient: "from-primary/20 to-primary/10"
            },
            {
              value: "15days",
              label: "15+ jours",
              subLabel: "15-30 jours",
              price: "21€",
              icon: Clock,
              gradient: "from-primary/15 to-primary/5"
            },
            {
              value: "30days",
              label: "30+ jours",
              subLabel: "30-45 jours",
              price: "19€",
              icon: Timer,
              gradient: "from-primary/10 to-primary/5"
            },
            {
              value: "45days",
              label: "45+ jours",
              subLabel: "plus de 45 jours",
              price: "15€",
              icon: History,
              gradient: "from-primary/5 to-primary/0"
            }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.div
                key={tab.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <TabsTrigger 
                  value={tab.value} 
                  className={`
                    relative group w-full h-full p-4 rounded-xl
                    bg-gradient-to-br ${tab.gradient}
                    border-2 border-primary/10 hover:border-primary/30
                    transition-all duration-300
                    data-[state=active]:border-primary
                    data-[state=active]:bg-primary/20
                    data-[state=active]:shadow-lg
                  `}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col items-start text-left space-y-1">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="font-medium">{tab.label}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {tab.subLabel}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">
                        {tab.price}
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </TabsTrigger>
              </motion.div>
            );
          })}
        </TabsList>
      </Tabs>
    </Card>
  );
};