import { Badge } from "@/components/ui/badge";
import { TrendingUp, Sparkles } from "lucide-react";
import { Lead } from "@/types/crm";

interface MarketplaceHeaderProps {
  availableLeads: Lead[];
}

export const MarketplaceHeader = ({ availableLeads }: MarketplaceHeaderProps) => {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-4 p-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
        Marketplace des Leads Qualifiés
      </h1>
      <p className="text-xl text-muted-foreground">
        Développez votre activité avec des leads vérifiés et qualifiés
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        <Badge variant="secondary" className="px-4 py-2 text-lg">
          <TrendingUp className="w-5 h-5 mr-2" />
          Taux de conversion moyen : 65%
        </Badge>
        <Badge variant="secondary" className="px-4 py-2 text-lg">
          <Sparkles className="w-5 h-5 mr-2" />
          {availableLeads.length} leads disponibles
        </Badge>
      </div>
    </div>
  );
};