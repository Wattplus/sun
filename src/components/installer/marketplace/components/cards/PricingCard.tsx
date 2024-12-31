import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PricingCardProps {
  availableLeads: number;
  onPrepaidAccount: () => void;
}

export const PricingCard = ({ availableLeads, onPrepaidAccount }: PricingCardProps) => {
  return (
    <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/10">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Tag className="w-5 h-5 text-primary" />
        </div>
        <div className="space-y-4 flex-1">
          <div>
            <p className="text-sm text-muted-foreground mb-3">Tarifs des leads</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-primary/5">
                <span className="text-sm font-medium">Particulier</span>
                <span className="text-lg font-semibold text-primary">26€</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-primary/5">
                <span className="text-sm font-medium">Professionnel</span>
                <span className="text-lg font-semibold text-primary">49€</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-sm font-medium text-primary">
              {availableLeads} leads disponibles
            </p>
            <Button 
              variant="link" 
              onClick={onPrepaidAccount}
              className="text-primary hover:text-primary/80 p-0 h-auto font-medium flex items-center gap-1"
            >
              Voir les détails
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};