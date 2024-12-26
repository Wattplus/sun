import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, TrendingUp, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";

export const MarketplacePage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <InstallerBreadcrumb />
      
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <p className="text-muted-foreground">
          Accédez à de nouveaux projets qualifiés et développez votre activité
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 space-y-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Nouveaux Leads</h2>
          <p className="text-muted-foreground">
            Découvrez les derniers projets qualifiés disponibles dans votre zone.
          </p>
          <Link to="nouveaux-leads">
            <Button className="w-full gap-2">
              Voir les leads disponibles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Statistiques</h2>
          <p className="text-muted-foreground">
            Suivez vos performances et analysez vos conversions.
          </p>
          <Button variant="outline" className="w-full gap-2" disabled>
            Bientôt disponible
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Partenaires</h2>
          <p className="text-muted-foreground">
            Connectez-vous avec d'autres professionnels du secteur.
          </p>
          <Button variant="outline" className="w-full gap-2" disabled>
            Bientôt disponible
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>
      </div>
    </div>
  );
};