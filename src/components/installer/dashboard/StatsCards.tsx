import { Card } from "@/components/ui/card";
import { Euro, Users, CheckCircle, Clock, ShoppingCart, Percent } from "lucide-react";

export const StatsCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-4 bg-background/50 backdrop-blur-md border-primary/20">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4 text-[#1EAEDB]" />
          <h3 className="text-sm font-medium">Leads Achetés</h3>
        </div>
        <p className="text-2xl font-bold mt-2">42</p>
        <p className="text-xs text-muted-foreground">
          +8 cette semaine
        </p>
      </Card>

      <Card className="p-4 bg-background/50 backdrop-blur-md border-primary/20">
        <div className="flex items-center gap-2">
          <Euro className="h-4 w-4 text-[#33C3F0]" />
          <h3 className="text-sm font-medium">Investissement Leads</h3>
        </div>
        <p className="text-2xl font-bold mt-2">2 100€</p>
        <p className="text-xs text-muted-foreground">
          Moyenne de 50€/lead
        </p>
      </Card>

      <Card className="p-4 bg-background/50 backdrop-blur-md border-primary/20">
        <div className="flex items-center gap-2">
          <Percent className="h-4 w-4 text-emerald-500" />
          <h3 className="text-sm font-medium">Taux de Conversion</h3>
        </div>
        <p className="text-2xl font-bold mt-2">28%</p>
        <p className="text-xs text-muted-foreground">
          12 devis signés
        </p>
      </Card>

      <Card className="p-4 bg-background/50 backdrop-blur-md border-primary/20">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#0FA0CE]" />
          <h3 className="text-sm font-medium">Temps de Contact</h3>
        </div>
        <p className="text-2xl font-bold mt-2">1.8h</p>
        <p className="text-xs text-muted-foreground">
          Premier contact après achat
        </p>
      </Card>
    </div>
  );
};