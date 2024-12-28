import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Sparkles, Users } from "lucide-react";
import { Lead } from "@/types/crm";
import { motion } from "framer-motion";
import { LeadCard } from "../LeadCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LeadsOverviewProps {
  availableLeads: Lead[];
  purchasedLeads: Lead[];
  onShowAllAvailable: () => void;
  onShowAllPurchased: () => void;
}

export const LeadsOverview = ({
  availableLeads,
  purchasedLeads,
  onShowAllAvailable,
  onShowAllPurchased,
}: LeadsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden border-2 border-primary/10 bg-glass-gradient backdrop-blur-sm hover:bg-glass-gradient-hover transition-all duration-300">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold">Leads Disponibles</h2>
                  <p className="text-sm text-muted-foreground">
                    {availableLeads.length} leads en attente
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost"
                onClick={onShowAllAvailable}
                className="gap-2 hover:bg-primary/5 group hidden sm:flex"
              >
                Voir tout
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <ScrollArea className="h-[300px] sm:h-[400px] pr-4">
              <div className="space-y-4">
                {availableLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    status="available"
                    onStatusChange={() => {}}
                  />
                ))}
              </div>
            </ScrollArea>
            <Button 
              variant="ghost"
              onClick={onShowAllAvailable}
              className="w-full mt-4 gap-2 hover:bg-primary/5 group sm:hidden"
            >
              Voir tout
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="overflow-hidden border-2 border-primary/10 bg-glass-gradient backdrop-blur-sm hover:bg-glass-gradient-hover transition-all duration-300">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold">Leads Achetés</h2>
                  <p className="text-sm text-muted-foreground">
                    {purchasedLeads.length} leads acquis
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost"
                onClick={onShowAllPurchased}
                className="gap-2 hover:bg-primary/5 group hidden sm:flex"
              >
                Voir tout
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <ScrollArea className="h-[300px] sm:h-[400px] pr-4">
              <div className="space-y-4">
                {purchasedLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    status="purchased"
                    onStatusChange={() => {}}
                  />
                ))}
              </div>
            </ScrollArea>
            <Button 
              variant="ghost"
              onClick={onShowAllPurchased}
              className="w-full mt-4 gap-2 hover:bg-primary/5 group sm:hidden"
            >
              Voir tout
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};