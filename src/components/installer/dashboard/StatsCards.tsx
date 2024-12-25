import { Card } from "@/components/ui/card";
import { Package, Users, TrendingUp, Star } from "lucide-react";

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 bg-background/50 backdrop-blur-md border-primary/20 hover:border-primary/40 transition-all">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Leads Disponibles</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-background/50 backdrop-blur-md border-primary/20 hover:border-primary/40 transition-all">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Projets Actifs</p>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-background/50 backdrop-blur-md border-primary/20 hover:border-primary/40 transition-all">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Projets Complétés</p>
            <p className="text-2xl font-bold">45</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-background/50 backdrop-blur-md border-primary/20 hover:border-primary/40 transition-all">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Star className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Taux de Conversion</p>
            <p className="text-2xl font-bold">68%</p>
          </div>
        </div>
      </Card>
    </div>
  );
};