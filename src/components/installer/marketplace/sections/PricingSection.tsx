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
          <div className="relative">
            {/* Badge RECOMMANDÉ avec un effet de glow */}
            <div className="absolute -right-3 -top-3 z-10">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                RECOMMANDÉ
              </div>
            </div>
            
            {/* Carte principale avec effet de glow */}
            <div className="p-4 rounded-lg relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                 style={{
                   background: 'linear-gradient(135deg, rgba(30,174,219,0.15) 0%, rgba(30,174,219,0.3) 100%)',
                   boxShadow: '0 0 20px rgba(30,174,219,0.2)'
                 }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary p-2.5 rounded-full">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-lg font-bold text-primary">Lead particulier</span>
                    <div className="flex flex-col gap-1.5 mt-2">
                      <span className="text-sm text-primary flex items-center gap-2">
                        <Check className="h-4 w-4" /> Avec compte prépayé
                      </span>
                      <span className="text-sm text-primary flex items-center gap-2">
                        <Star className="h-4 w-4" /> Tarif préférentiel
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary">26€</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-background/40 rounded-lg border border-muted/20 hover:border-muted/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-muted/20 p-2 rounded-full">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <span className="text-base font-medium">Lead particulier</span>
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Sans compte prépayé
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold">35€</div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-lg border border-accent/10 hover:border-accent/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-accent/20 p-2 rounded-full">
                  <Building2 className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <span className="text-base font-medium text-accent">Lead professionnel</span>
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-sm text-accent/80 flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Projets B2B
                    </span>
                    <span className="text-sm text-accent/80 flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" /> Potentiel élevé
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold text-accent">59€</div>
            </div>
          </div>
        </div>

        <Button className="w-full gap-2 bg-gradient-to-r from-primary via-primary-light to-primary hover:from-primary-dark hover:via-primary hover:to-primary-light text-base font-medium py-6" size="lg">
          <Sparkles className="h-5 w-5" />
          Créer un compte prépayé
        </Button>
      </div>
    </Card>
  );
};