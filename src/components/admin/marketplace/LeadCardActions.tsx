import { Button } from "@/components/ui/button";
import { Wallet, CreditCard, Loader2 } from "lucide-react";

interface LeadCardActionsProps {
  onPurchase: (type: 'mutualise' | 'exclusif', paymentMethod: 'prepaid' | 'direct') => void;
  mutualPrice: number;
  exclusivePrice: number;
  canPurchaseMutual: boolean;
  canPurchaseExclusive: boolean;
  isProfessionalProject: boolean;
  isLoading?: boolean;
}

export const LeadCardActions = ({
  onPurchase,
  mutualPrice,
  exclusivePrice,
  canPurchaseMutual,
  canPurchaseExclusive,
  isProfessionalProject,
  isLoading = false,
}: LeadCardActionsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#1EAEDB]">Acheter ce lead</span>
          <span className="text-sm font-medium">{mutualPrice}€</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="w-full bg-[#1EAEDB]/10 hover:bg-[#1EAEDB]/20 border-[#1EAEDB]/20 hover:border-[#1EAEDB]/40"
            onClick={() => onPurchase('mutualise', 'prepaid')}
            disabled={!canPurchaseMutual || isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Wallet className="w-4 h-4 mr-2" />
            )}
            Compte prépayé
          </Button>
          <Button
            variant="outline"
            className="w-full bg-[#1EAEDB]/10 hover:bg-[#1EAEDB]/20 border-[#1EAEDB]/20 hover:border-[#1EAEDB]/40"
            onClick={() => onPurchase('mutualise', 'direct')}
            disabled={!canPurchaseMutual || isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <CreditCard className="w-4 h-4 mr-2" />
            )}
            Carte bancaire
          </Button>
        </div>
      </div>
    </div>
  );
};