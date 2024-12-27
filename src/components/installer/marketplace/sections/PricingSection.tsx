import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Euro, Sparkles, Building2, User, Check } from "lucide-react";

export const PricingSection = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-primary border-b border-primary/20 pb-4">
          <Euro className="h-6 w-6" />
          <h3 className="font-semibold text-xl gradient-text">Tarifs des leads</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg hover:bg-primary/15 transition-colors duration-200 card-hover">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-full">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="font-semibold text-lg text-primary">Lead particulier</span>
                <div className="text-sm text-primary/80 flex items-center gap-1 mt-1">
                  <Check className="h-4 w-4" /> Avec compte prépayé
                </div>
              </div>
            </div>
            <div className="text-2xl font-bold text-primary">26€</div>
          </div>

          <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-background/60 transition-colors duration-200 card-hover">
            <div className="flex items-center gap-3">
              <div className="bg-background/60 p-2 rounded-full">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <span className="font-semibold text-lg">Lead particulier</span>
                <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Check className="h-4 w-4" /> Sans compte prépayé
                </div>
              </div>
            </div>
            <div className="text-2xl font-bold">35€</div>
          </div>

          <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg hover:bg-accent/15 transition-colors duration-200 card-hover">
            <div className="flex items-center gap-3">
              <div className="bg-accent/20 p-2 rounded-full">
                <Building2 className="h-5 w-5 text-accent" />
              </div>
              <div>
                <span className="font-semibold text-lg text-accent">Lead professionnel</span>
                <div className="text-sm text-accent/80 flex items-center gap-1 mt-1">
                  <Check className="h-4 w-4" /> Projets B2B
                </div>
              </div>
            </div>
            <div className="text-2xl font-bold text-accent">59€</div>
          </div>
        </div>

        <Button className="w-full gap-2 bg-primary hover:bg-primary-dark text-lg font-semibold" size="lg">
          <Sparkles className="h-5 w-5" />
          Créer un compte prépayé
        </Button>
      </div>
    </Card>
  );
};