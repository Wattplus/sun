import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const DashboardHeader = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">
          Tableau de bord
        </h1>
        <p className="text-muted-foreground">
          Bienvenue dans votre espace installateur
        </p>
      </div>

      <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Passez au niveau supérieur</h3>
              <p className="text-muted-foreground">
                Débloquez toutes les fonctionnalités avec notre abonnement Premium
              </p>
            </div>
          </div>
          <Link to="/espace-installateur/marketplace">
            <Button className="gap-2" size="lg">
              Voir les offres
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};