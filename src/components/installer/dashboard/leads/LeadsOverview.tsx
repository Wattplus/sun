import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
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
        <Card className="overflow-hidden border border-primary/10 bg-background/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Leads Disponibles
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Découvrez les nouveaux prospects qualifiés
                </p>
              </div>
              <Button 
                variant="ghost"
                onClick={onShowAllAvailable}
                className="gap-2 hover:bg-primary/5"
              >
                Voir tout
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <LeadsList leads={availableLeads.slice(0, 2)} />
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="overflow-hidden border border-primary/10 bg-background/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Leads Achetés
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Gérez vos leads en cours
                </p>
              </div>
              <Button 
                variant="ghost"
                onClick={onShowAllPurchased}
                className="gap-2 hover:bg-primary/5"
              >
                Voir tout
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <PurchasedLeads leads={purchasedLeads.slice(0, 2)} />
          </div>
        </Card>
      </motion.div>
    </div>
  );
};