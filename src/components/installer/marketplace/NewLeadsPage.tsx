import { Card } from "@/components/ui/card";
import { LeadsList } from "../dashboard/LeadsList";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { PrepaidBalance } from "../dashboard/PrepaidBalance";
import { TrendingUp, Users, Wallet } from "lucide-react";

export const NewLeadsPage = () => {
  return (
    <div className="space-y-8 p-6">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* En-tête amélioré */}
        <div className="glass-panel p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Nouveaux Leads Disponibles
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Découvrez tous les leads qualifiés disponibles pour votre région. 
                Nos leads sont soigneusement sélectionnés et vérifiés pour assurer 
                une qualité optimale.
              </p>
              <div className="flex gap-6 pt-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Leads qualifiés</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>32% taux de conversion</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Wallet className="h-5 w-5 text-primary" />
                  <span>Garantie satisfait</span>
                </div>
              </div>
            </div>
            <div className="md:ml-auto w-full md:max-w-sm">
              <PrepaidBalance balance={150} />
            </div>
          </div>
        </div>

        {/* Tableau des leads */}
        <Card className="p-6 glass-panel">
          <LeadsList leads={mockAvailableLeads} />
        </Card>
      </div>
    </div>
  );
};