import { Card } from "@/components/ui/card";
import { Euro, Users, CheckCircle, Clock } from "lucide-react";

export const StatsCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Euro className="h-4 w-4 text-blue-500" />
          <h3 className="text-sm font-medium">Chiffre d'affaires</h3>
        </div>
        <p className="text-2xl font-bold mt-2">15 000€</p>
        <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-green-500" />
          <h3 className="text-sm font-medium">Leads actifs</h3>
        </div>
        <p className="text-2xl font-bold mt-2">24</p>
        <p className="text-xs text-muted-foreground">8 nouveaux cette semaine</p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-purple-500" />
          <h3 className="text-sm font-medium">Taux de conversion</h3>
        </div>
        <p className="text-2xl font-bold mt-2">32%</p>
        <p className="text-xs text-muted-foreground">Moyenne sur 30 jours</p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-orange-500" />
          <h3 className="text-sm font-medium">Temps de réponse</h3>
        </div>
        <p className="text-2xl font-bold mt-2">2.4h</p>
        <p className="text-xs text-muted-foreground">Moyenne sur 7 jours</p>
      </Card>
    </div>
  );
};