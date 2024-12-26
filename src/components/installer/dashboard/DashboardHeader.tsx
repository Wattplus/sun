import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBar, Users, Target, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-background/50 backdrop-blur-md border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ChartBar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Leads Achetés</p>
              <p className="text-2xl font-bold">42</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-background/50 backdrop-blur-md border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Taux de Conversion</p>
              <p className="text-2xl font-bold">28%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-background/50 backdrop-blur-md border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CA Généré</p>
              <p className="text-2xl font-bold">125k€</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-background/50 backdrop-blur-md border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Clients Actifs</p>
              <p className="text-2xl font-bold">18</p>
            </div>
          </div>
        </Card>
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