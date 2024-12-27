import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { LeadsList } from "../LeadsList";
import { Lead } from "@/types/crm";

interface AllAvailableLeadsProps {
  leads: Lead[];
  onClose: () => void;
}

export const AllAvailableLeads = ({ leads, onClose }: AllAvailableLeadsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">
            Tous Les Leads Disponibles
          </h2>
          <p className="text-muted-foreground">
            Découvrez tous les leads qualifiés disponibles pour votre région
          </p>
        </div>
        <Button 
          variant="outline"
          onClick={onClose}
          className="gap-2 border-primary/20 hover:border-primary/40 hover:bg-primary/10"
        >
          <X className="h-4 w-4" />
          Retour au tableau de bord
        </Button>
      </div>
      <Card className="p-8 glass-panel border-2 border-primary/20 hover:border-primary/30 transition-all duration-300">
        <LeadsList leads={leads} />
      </Card>
    </div>
  );
};