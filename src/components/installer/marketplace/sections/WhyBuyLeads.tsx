import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, ArrowRight, Shield, Rocket, Clock } from "lucide-react";

export const WhyBuyLeads = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-primary">
          <Info className="h-5 w-5" />
          <h3 className="font-medium text-lg">Pourquoi acheter ces leads ?</h3>
        </div>
        <ul className="space-y-4">
          <li className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="font-medium">Leads qualifiés et vérifiés</span>
              <p className="text-sm text-muted-foreground">
                Chaque lead est minutieusement vérifié pour garantir sa qualité
              </p>
            </div>
          </li>
          <li className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Rocket className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="font-medium">Projets à fort potentiel</span>
              <p className="text-sm text-muted-foreground">
                Sélectionnés pour leur potentiel de conversion élevé
              </p>
            </div>
          </li>
          <li className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="font-medium">Contact rapide recommandé</span>
              <p className="text-sm text-muted-foreground">
                Maximisez vos chances en contactant rapidement les prospects
              </p>
            </div>
          </li>
        </ul>
        <Button className="w-full gap-2" size="lg">
          Recharger mon compte
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};