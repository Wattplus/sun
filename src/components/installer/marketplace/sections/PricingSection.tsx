import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Building2, User, Check, Star } from "lucide-react";

export const PricingSection = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-background via-background/95 to-background border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-primary/10 pb-3">
          <div>
            <h3 className="text-lg font-semibold text-white">Tarifs des leads</h3>
            <p className="text-sm text-muted-foreground">
              Choisissez l'offre adaptée à vos besoins
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="relative transform hover:scale-105 transition-all duration-300">
            <div className="absolute -right-2 -top-2 z-10">
              <div className="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg bg-gradient-to-r from-primary to-accent animate-gradient">
                RECOMMANDÉ
              </div>
            </div>
            
            <div className="p-4 rounded-lg relative overflow-hidden transition-all duration-300 bg-gradient-to-br from-white/5 to-primary/5 border border-primary/10 shadow-lg hover:shadow-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-primary to-accent p-2.5 rounded-full shadow-lg">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
                      Lead particulier
                    </span>
                    <div className="flex flex-col gap-1.5 mt-2">
                      <span className="text-sm flex items-center gap-2 text-white/80">
                        <Check className="h-4 w-4 text-primary" /> Avec compte prépayé
                      </span>
                      <span className="text-sm flex items-center gap-2 text-white/80">
                        <Star className="h-4 w-4 text-accent" /> Tarif préférentiel
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
                  26€
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg relative overflow-hidden hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-secondary/5 border border-secondary/10 shadow-lg hover:shadow-secondary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-secondary to-accent p-2 rounded-full shadow-lg">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="text-base font-medium text-white">
                    Lead particulier
                  </span>
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-sm text-white/60">
                      Sans compte prépayé
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">
                35€
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg relative overflow-hidden hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-accent/5 border border-accent/10 shadow-lg hover:shadow-accent/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-accent to-primary p-2 rounded-full shadow-lg">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="text-base font-medium text-white">
                    Lead professionnel
                  </span>
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-sm text-white/60 flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Projets B2B
                    </span>
                    <span className="text-sm text-white/60 flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" /> Potentiel élevé
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">
                59€
              </div>
            </div>
          </div>
        </div>

        <Button 
          className="w-full gap-2 text-base font-medium py-6 bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 border-0 transition-all duration-300 bg-[length:200%_100%] animate-gradient text-white"
        >
          <Sparkles className="h-5 w-5" />
          Créer un compte prépayé
        </Button>
      </div>
    </Card>
  );
};