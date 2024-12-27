import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Euro, Sparkles, Building2, User, Check, Star } from "lucide-react";

export const PricingSection = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-primary/20 pb-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-2 rounded-full">
              <Euro className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-2xl bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent">
                Tarifs des leads
              </h3>
              <p className="text-sm text-primary/80 mt-1">
                Choisissez l'offre adaptée à vos besoins
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="relative overflow-hidden flex items-center justify-between p-6 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 rounded-lg hover:from-primary/20 hover:via-primary/30 hover:to-primary/20 transition-all duration-300 transform hover:scale-[1.02] card-hover">
            <div className="absolute top-0 right-0">
              <div className="bg-primary/30 text-primary text-xs px-3 py-1 rounded-bl-lg font-medium">
                RECOMMANDÉ
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary/30 p-3 rounded-full">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <span className="font-bold text-xl text-primary">Lead particulier</span>
                <div className="text-sm text-primary/80 flex items-center gap-2 mt-2">
                  <Check className="h-4 w-4" /> Avec compte prépayé
                </div>
                <div className="text-sm text-primary/80 flex items-center gap-2 mt-1">
                  <Star className="h-4 w-4" /> Tarif préférentiel
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-primary">26€</div>
          </div>

          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-background/40 via-background/50 to-background/40 rounded-lg hover:from-background/50 hover:via-background/60 hover:to-background/50 transition-all duration-300 transform hover:scale-[1.02] card-hover">
            <div className="flex items-center gap-4">
              <div className="bg-background/60 p-3 rounded-full">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <span className="font-bold text-xl">Lead particulier</span>
                <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                  <Check className="h-4 w-4" /> Sans compte prépayé
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold">35€</div>
          </div>

          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-accent/10 via-accent/20 to-accent/10 rounded-lg hover:from-accent/20 hover:via-accent/30 hover:to-accent/20 transition-all duration-300 transform hover:scale-[1.02] card-hover">
            <div className="flex items-center gap-4">
              <div className="bg-accent/20 p-3 rounded-full">
                <Building2 className="h-6 w-6 text-accent" />
              </div>
              <div>
                <span className="font-bold text-xl text-accent">Lead professionnel</span>
                <div className="text-sm text-accent/80 flex items-center gap-2 mt-2">
                  <Check className="h-4 w-4" /> Projets B2B
                </div>
                <div className="text-sm text-accent/80 flex items-center gap-2 mt-1">
                  <Star className="h-4 w-4" /> Potentiel élevé
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-accent">59€</div>
          </div>
        </div>

        <Button className="w-full gap-3 bg-gradient-to-r from-primary via-primary-light to-primary hover:from-primary-dark hover:via-primary hover:to-primary-light text-lg font-bold py-6" size="lg">
          <Sparkles className="h-5 w-5" />
          Créer un compte prépayé
        </Button>
      </div>
    </Card>
  );
};