import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, TrendingUp, Users, ArrowRight, Sparkles, Target, BadgePercent } from "lucide-react";
import { Link } from "react-router-dom";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { Badge } from "@/components/ui/badge";

export const MarketplacePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <InstallerBreadcrumb />
      
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
            Marketplace des Leads Qualifiés
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Développez votre activité avec des leads vérifiés et qualifiés, prêts à concrétiser leurs projets
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              <TrendingUp className="w-5 h-5 mr-2" />
              Taux de conversion moyen : 65%
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              <Target className="w-5 h-5 mr-2" />
              Leads géolocalisés
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4 bg-primary/5 border-primary/20 hover:border-primary/40 transition-all duration-300">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Nouveaux Leads</h2>
            <p className="text-muted-foreground">
              Accédez aux derniers projets qualifiés dans votre zone. Premiers arrivés, premiers servis !
            </p>
            <div className="pt-4">
              <Link to="nouveaux-leads">
                <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                  Voir les leads disponibles
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 space-y-4 bg-primary/5 border-primary/20 hover:border-primary/40 transition-all duration-300">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Leads Premium</h2>
            <p className="text-muted-foreground">
              Leads exclusifs avec un potentiel de conversion élevé. Accès prioritaire pour nos membres Premium.
            </p>
            <div className="pt-4">
              <Link to="leads-premium">
                <Button variant="outline" className="w-full gap-2 border-primary/20 hover:bg-primary/10">
                  Découvrir les leads Premium
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 space-y-4 bg-primary/5 border-primary/20 hover:border-primary/40 transition-all duration-300">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <BadgePercent className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Offres Spéciales</h2>
            <p className="text-muted-foreground">
              Packs de leads à prix avantageux. Économisez jusqu'à 30% sur vos achats en masse.
            </p>
            <div className="pt-4">
              <Link to="offres-speciales">
                <Button variant="outline" className="w-full gap-2 border-primary/20 hover:bg-primary/10">
                  Voir les offres
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-primary/5 border-primary/20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">95%</div>
              <p className="text-muted-foreground">Taux de satisfaction client</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">48h</div>
              <p className="text-muted-foreground">Délai moyen de réponse</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">+2000</div>
              <p className="text-muted-foreground">Projets concrétisés</p>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <Link to="nouveaux-leads">
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-lg px-8">
              Accéder aux leads disponibles
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};