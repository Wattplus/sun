import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Euro, Sparkles, Building2, User } from "lucide-react";

export const PricingSection = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-primary">
          <Euro className="h-5 w-5" />
          <h3 className="font-medium text-lg">Tarifs des leads</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <div>
                <span className="font-medium">Lead particulier</span>
                <div className="text-sm text-muted-foreground">Avec compte prépayé</div>
              </div>
            </div>
            <div className="text-xl font-bold text-primary">26€</div>
          </div>

          <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <span className="font-medium">Lead particulier</span>
                <div className="text-sm text-muted-foreground">Sans compte prépayé</div>
              </div>
            </div>
            <div className="text-xl font-bold">35€</div>
          </div>

          <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-accent" />
              <div>
                <span className="font-medium">Lead professionnel</span>
                <div className="text-sm text-muted-foreground">Projets B2B</div>
              </div>
            </div>
            <div className="text-xl font-bold text-accent">59€</div>
          </div>
        </div>

        <Button className="w-full gap-2 bg-primary hover:bg-primary-dark" size="lg">
          <Sparkles className="h-4 w-4" />
          Créer un compte prépayé
        </Button>
      </div>
    </Card>
  );
};