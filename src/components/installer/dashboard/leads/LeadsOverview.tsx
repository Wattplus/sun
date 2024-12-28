import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Sparkles, Users } from "lucide-react";
import { LeadsList } from "../LeadsList";
import { PurchasedLeads } from "../PurchasedLeads";
import { Lead } from "@/types/crm";
import { motion } from "framer-motion";

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden border-2 border-primary/10 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 shadow-lg">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Leads Disponibles
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Découvrez les nouveaux prospects qualifiés
                </p>
              </div>
              <Button 
                variant="ghost"
                onClick={onShowAllAvailable}
                className="gap-2 hover:bg-primary/5 text-primary"
              >
                Voir tout
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="bg-card rounded-xl shadow-sm">
              <LeadsList leads={availableLeads.slice(0, 2)} />
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="overflow-hidden border-2 border-primary/10 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 shadow-lg">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Leads Achetés
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Gérez vos leads en cours
                </p>
              </div>
              <Button 
                variant="ghost"
                onClick={onShowAllPurchased}
                className="gap-2 hover:bg-primary/5 text-primary"
              >
                Voir tout
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="bg-card rounded-xl shadow-sm">
              <PurchasedLeads leads={purchasedLeads.slice(0, 2)} />
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};