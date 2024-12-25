import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const EmptyLeadState = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-8 text-center space-y-6 bg-background/50 backdrop-blur-md border-primary/20">
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-primary/10 rounded-full">
          <ShoppingCart className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">Aucun lead acheté</h3>
        <p className="text-muted-foreground max-w-md">
          Commencez à développer votre activité en achetant vos premiers leads qualifiés
        </p>
      </div>
      
      <div className="flex flex-col gap-4 items-center">
        <Button 
          onClick={() => navigate("/espace-installateur/marketplace")}
          className="bg-primary hover:bg-primary/90 gap-2"
          size="lg"
        >
          <ShoppingCart className="h-5 w-5" />
          Voir les leads disponibles
        </Button>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span>32% de taux de conversion moyen</span>
        </div>
      </div>
    </Card>
  );
};