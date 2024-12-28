import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const DashboardHeader = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Tableau de bord
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Bienvenue dans votre espace installateur premium - Gérez vos leads et développez votre activité
        </p>
      </div>

      <Card className="p-4 sm:p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold">Passez au niveau supérieur</h3>
              <p className="text-sm text-muted-foreground">
                Débloquez toutes les fonctionnalités avec notre abonnement Premium
              </p>
            </div>
          </div>
          <Link to="/espace-installateur/marketplace" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto gap-2" size="lg">
              Voir les offres
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};