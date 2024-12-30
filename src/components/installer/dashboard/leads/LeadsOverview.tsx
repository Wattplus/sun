import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Sparkles, Users } from "lucide-react";
import { Lead } from "@/types/crm";
import { motion } from "framer-motion";
import { LeadCard } from "../LeadCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
  const navigate = useNavigate();

  useEffect(() => {
    console.log("[LeadsOverview] Available leads:", availableLeads.length);
    console.log("[LeadsOverview] Purchased leads:", purchasedLeads.length);
  }, [availableLeads, purchasedLeads]);

  const handleNavigateToAvailable = () => {
    navigate("/espace-installateur/marketplace");
  };

  const handleNavigateToPurchased = () => {
    navigate("/espace-installateur/leads");
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Vue d'ensemble</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="overflow-hidden border border-primary/10 bg-background/50 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-primary/5 rounded-xl">
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white">Leads Disponibles</h2>
                    <p className="text-sm text-muted-foreground">
                      {availableLeads.length} leads en attente
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost"
                  onClick={handleNavigateToAvailable}
                  className="gap-2 text-primary hover:text-primary/80 hover:bg-primary/5 group hidden sm:flex"
                >
                  Voir tout
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {availableLeads.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      status="available"
                      onStatusChange={() => {}}
                    />
                  ))}
                  {availableLeads.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Aucun lead disponible pour le moment
                    </p>
                  )}
                </div>
              </ScrollArea>
              <Button 
                variant="ghost"
                onClick={handleNavigateToAvailable}
                className="w-full mt-4 gap-2 text-primary hover:text-primary/80 hover:bg-primary/5 group sm:hidden"
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
          <Card className="overflow-hidden border border-primary/10 bg-background/50 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-primary/5 rounded-xl">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white">Leads Achetés</h2>
                    <p className="text-sm text-muted-foreground">
                      {purchasedLeads.length} leads acquis
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost"
                  onClick={handleNavigateToPurchased}
                  className="gap-2 text-primary hover:text-primary/80 hover:bg-primary/5 group hidden sm:flex"
                >
                  Voir tout
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {purchasedLeads.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      status="purchased"
                      onStatusChange={() => {}}
                    />
                  ))}
                  {purchasedLeads.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Aucun lead acheté pour le moment
                    </p>
                  )}
                </div>
              </ScrollArea>
              <Button 
                variant="ghost"
                onClick={handleNavigateToPurchased}
                className="w-full mt-4 gap-2 text-primary hover:text-primary/80 hover:bg-primary/5 group sm:hidden"
              >
                Voir tout
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};