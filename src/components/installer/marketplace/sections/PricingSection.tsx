import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Euro, Sparkles, Building2, User, Check, Star } from "lucide-react";

export const PricingSection = () => {
  return (
    <Card className="p-4 bg-gradient-to-br from-background/95 via-background/90 to-background border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-primary/10 pb-3">
          <div className="bg-primary/10 p-1.5 rounded-full">
            <Euro className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary">Tarifs des leads</h3>
            <p className="text-xs text-primary/80">
              Choisissez l'offre adaptée à vos besoins
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="relative overflow-hidden">
            <div className="absolute -right-6 -top-1 rotate-45 bg-primary/80 px-6 py-1 text-[10px] font-medium text-white">
              RECOMMANDÉ
            </div>
            <div className="p-3 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-lg border border-primary/10 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <User className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-primary">Lead particulier</span>
                    <div className="flex flex-col gap-1 mt-1">
                      <span className="text-xs text-primary/80 flex items-center gap-1">
                        <Check className="h-3 w-3" /> Avec compte prépayé
                      </span>
                      <span className="text-xs text-primary/80 flex items-center gap-1">
                        <Star className="h-3 w-3" /> Tarif préférentiel
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-xl font-bold text-primary">26€</div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-gradient-to-r from-background/40 via-background/50 to-background/40 rounded-lg border border-muted/20 hover:border-muted/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-muted/20 p-2 rounded-full">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div>
                  <span className="text-sm font-medium">Lead particulier</span>
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Check className="h-3 w-3" /> Sans compte prépayé
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-xl font-bold">35€</div>
            </div>
          </div>

          <div className="p-3 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-lg border border-accent/10 hover:border-accent/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-accent/20 p-2 rounded-full">
                  <Building2 className="h-3.5 w-3.5 text-accent" />
                </div>
                <div>
                  <span className="text-sm font-medium text-accent">Lead professionnel</span>
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-xs text-accent/80 flex items-center gap-1">
                      <Check className="h-3 w-3" /> Projets B2B
                    </span>
                    <span className="text-xs text-accent/80 flex items-center gap-1">
                      <Star className="h-3 w-3" /> Potentiel élevé
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-xl font-bold text-accent">59€</div>
            </div>
          </div>
        </div>

        <Button className="w-full gap-2 bg-gradient-to-r from-primary via-primary-light to-primary hover:from-primary-dark hover:via-primary hover:to-primary-light text-sm font-medium py-4" size="sm">
          <Sparkles className="h-4 w-4" />
          Créer un compte prépayé
        </Button>
      </div>
    </Card>
  );
};