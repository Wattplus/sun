import { TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MarketplaceHeaderProps {
  availableLeads: number;
}

export const MarketplaceHeader = ({ availableLeads }: MarketplaceHeaderProps) => {
  return (
    <div className="text-center space-y-4 py-8 px-4 rounded-2xl bg-background/50 backdrop-blur-sm border border-primary/10">
      <h1 className="text-4xl font-bold text-gradient">
        Marketplace des Leads Qualifiés
      </h1>
      <p className="text-xl text-muted-foreground">
        Développez votre activité avec des leads vérifiés et qualifiés
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Badge variant="secondary" className="px-4 py-2 text-lg bg-primary/10 text-primary border-primary/20">
          <TrendingUp className="w-5 h-5 mr-2" />
          Taux de conversion moyen : 25%
        </Badge>
        <Badge variant="secondary" className="px-4 py-2 text-lg bg-primary/10 text-primary border-primary/20">
          <Users className="w-5 h-5 mr-2" />
          {availableLeads} leads disponibles
        </Badge>
      </div>
    </div>
  );
};