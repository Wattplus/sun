import { Card } from "@/components/ui/card";
import { LeadsList } from "../dashboard/LeadsList";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { PrepaidBalance } from "../dashboard/PrepaidBalance";
import { TrendingUp, Users, Wallet, ShoppingCart } from "lucide-react";

export const NewLeadsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto space-y-8 py-8">
        {/* En-tête amélioré */}
        <div className="glass-panel p-8 space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="font-medium">Marketplace</span>
                </div>
                <h1 className="text-4xl font-bold gradient-text">
                  Nouveaux Leads Disponibles
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Découvrez tous les leads qualifiés disponibles pour votre région. 
                  Nos leads sont soigneusement sélectionnés et vérifiés pour assurer 
                  une qualité optimale.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-4 bg-background/40 border-primary/20 hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Leads qualifiés</p>
                      <p className="text-sm text-muted-foreground">Vérifiés à 100%</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-background/40 border-primary/20 hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">32% conversion</p>
                      <p className="text-sm text-muted-foreground">Taux moyen</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-background/40 border-primary/20 hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Wallet className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Garantie satisfait</p>
                      <p className="text-sm text-muted-foreground">Ou remboursé</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="w-full max-w-md mx-auto lg:ml-auto">
              <PrepaidBalance balance={150} />
            </div>
          </div>
        </div>

        {/* Tableau des leads */}
        <Card className="glass-panel p-6 animate-fadeIn">
          <LeadsList leads={mockAvailableLeads} />
        </Card>
      </div>
    </div>
  );
};