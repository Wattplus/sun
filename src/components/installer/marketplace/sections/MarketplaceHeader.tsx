import { TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MarketplaceHeaderProps {
  availableLeads: number;
}

export const MarketplaceHeader = ({ availableLeads }: MarketplaceHeaderProps) => {
  return (
    <div className="text-center space-y-4 py-6 sm:py-8 px-4 rounded-2xl bg-background/50 backdrop-blur-sm border border-primary/10">
      <h1 className="text-2xl sm:text-4xl font-bold text-gradient">
        Marketplace des Leads Qualifiés
      </h1>
      <p className="text-base sm:text-xl text-muted-foreground px-2 sm:px-0">
        Développez votre activité avec des leads vérifiés et qualifiés
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <Badge variant="secondary" className="px-3 sm:px-4 py-1.5 sm:py-2 text-base sm:text-lg bg-primary/10 text-primary border-primary/20 w-full sm:w-auto">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Taux de conversion moyen : 25%
        </Badge>
        <Badge variant="secondary" className="px-3 sm:px-4 py-1.5 sm:py-2 text-base sm:text-lg bg-primary/10 text-primary border-primary/20 w-full sm:w-auto">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          {availableLeads} leads disponibles
        </Badge>
      </div>
    </div>
  );
};