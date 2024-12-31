import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Clock, Sparkles, Timer, History } from "lucide-react";
import { motion } from "framer-motion";

interface LeadAgeTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const LeadAgeTabs = ({ activeTab, onTabChange }: LeadAgeTabsProps) => {
  return (
    <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl shadow-2xl">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full bg-transparent h-auto p-0">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <TabsTrigger 
              value="new" 
              className="relative group data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/10 w-full h-full p-6 rounded-xl border-2 border-primary/20 hover:border-primary/40 shadow-lg"
            >
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                  <span className="font-bold text-xl">Nouveaux leads</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-base text-muted-foreground font-medium">
                    moins de 15 jours
                  </span>
                  <div className="flex items-center justify-center bg-primary text-white px-6 py-3 rounded-full text-2xl font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    26€
                  </div>
                </div>
              </div>
            </TabsTrigger>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <TabsTrigger 
              value="15days"
              className="relative group data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/10 w-full h-full p-6 rounded-xl border-2 border-primary/20 hover:border-primary/40 shadow-lg"
            >
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary animate-pulse" />
                  <span className="font-bold text-xl">15+ jours</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-base text-muted-foreground font-medium">
                    15-30 jours
                  </span>
                  <div className="flex items-center justify-center bg-primary/90 text-white px-6 py-3 rounded-full text-2xl font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    21€
                  </div>
                </div>
              </div>
            </TabsTrigger>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <TabsTrigger 
              value="30days"
              className="relative group data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/10 w-full h-full p-6 rounded-xl border-2 border-primary/20 hover:border-primary/40 shadow-lg"
            >
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="flex items-center gap-3">
                  <Timer className="h-6 w-6 text-primary animate-pulse" />
                  <span className="font-bold text-xl">30+ jours</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-base text-muted-foreground font-medium">
                    30-45 jours
                  </span>
                  <div className="flex items-center justify-center bg-primary/80 text-white px-6 py-3 rounded-full text-2xl font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    19€
                  </div>
                </div>
              </div>
            </TabsTrigger>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <TabsTrigger 
              value="45days"
              className="relative group data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/10 w-full h-full p-6 rounded-xl border-2 border-primary/20 hover:border-primary/40 shadow-lg"
            >
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="flex items-center gap-3">
                  <History className="h-6 w-6 text-primary animate-pulse" />
                  <span className="font-bold text-xl">45+ jours</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-base text-muted-foreground font-medium">
                    plus de 45 jours
                  </span>
                  <div className="flex items-center justify-center bg-primary/70 text-white px-6 py-3 rounded-full text-2xl font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    15€
                  </div>
                </div>
              </div>
            </TabsTrigger>
          </motion.div>
        </TabsList>
      </Tabs>
    </Card>
  );
};