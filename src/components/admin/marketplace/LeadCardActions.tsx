import { Button } from "@/components/ui/button";
import { Crown, Euro, ArrowRight } from "lucide-react";
import { formatPrice } from "@/utils/leadPricing";

interface LeadCardActionsProps {
  onPurchase: (type: 'mutualise' | 'exclusif') => void;
  mutualPrice: number;
  exclusivePrice: number;
  canPurchaseMutual: boolean;
  canPurchaseExclusive: boolean;
}

export const LeadCardActions = ({
  onPurchase,
  mutualPrice,
  exclusivePrice,
  canPurchaseMutual,
  canPurchaseExclusive
}: LeadCardActionsProps) => {
  return (
    <div className="flex gap-4 mt-4">
      <Button 
        size="lg" 
        onClick={() => onPurchase('mutualise')}
        disabled={!canPurchaseMutual}
        className="flex-1 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
      >
        <Euro className="h-4 w-4 mr-2" />
        Lead mutualisé - {formatPrice(mutualPrice)}
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
      <Button 
        size="lg" 
        onClick={() => onPurchase('exclusif')}
        disabled={!canPurchaseExclusive}
        className="flex-1 bg-primary hover:bg-primary/90"
      >
        <Crown className="h-4 w-4 mr-2" />
        Lead exclusif - {formatPrice(exclusivePrice)}
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};