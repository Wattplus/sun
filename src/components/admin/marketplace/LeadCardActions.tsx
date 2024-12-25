import { Button } from "@/components/ui/button";
import { Crown, Euro, ArrowRight, Wallet, CreditCard } from "lucide-react";
import { formatPrice } from "@/utils/leadPricing";

interface LeadCardActionsProps {
  onPurchase: (type: 'mutualise' | 'exclusif', paymentMethod: 'prepaid' | 'direct') => void;
  mutualPrice: number;
  exclusivePrice: number;
  canPurchaseMutual: boolean;
  canPurchaseExclusive: boolean;
  isProfessionalProject?: boolean;
}

export const LeadCardActions = ({
  onPurchase,
  mutualPrice,
  exclusivePrice,
  canPurchaseMutual,
  canPurchaseExclusive,
  isProfessionalProject = false
}: LeadCardActionsProps) => {
  if (isProfessionalProject) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            size="lg" 
            onClick={() => onPurchase('exclusif', 'prepaid')}
            disabled={!canPurchaseExclusive}
            className="flex-1 bg-[#0B1221] hover:bg-[#1EAEDB]/10 text-[#1EAEDB] border border-[#1EAEDB]/20 hover:border-[#1EAEDB]/40"
            variant="outline"
          >
            <Wallet className="h-4 w-4 mr-2" />
            Solde prépayé ({formatPrice(exclusivePrice)}€)
          </Button>
          
          <Button 
            size="lg" 
            onClick={() => onPurchase('exclusif', 'direct')}
            disabled={!canPurchaseExclusive}
            className="flex-1 bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Payer ({formatPrice(exclusivePrice)}€)
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Button 
          size="lg" 
          onClick={() => onPurchase('mutualise', 'prepaid')}
          disabled={!canPurchaseMutual}
          className="flex-1 bg-[#0B1221] hover:bg-[#1EAEDB]/10 text-[#1EAEDB] border border-[#1EAEDB]/20 hover:border-[#1EAEDB]/40"
          variant="outline"
        >
          <Wallet className="h-4 w-4 mr-2" />
          Solde prépayé ({formatPrice(mutualPrice)}€)
        </Button>
        
        <Button 
          size="lg" 
          onClick={() => onPurchase('mutualise', 'direct')}
          disabled={!canPurchaseMutual}
          className="flex-1 bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Payer ({formatPrice(mutualPrice)}€)
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          size="lg" 
          onClick={() => onPurchase('exclusif', 'prepaid')}
          disabled={!canPurchaseExclusive}
          className="flex-1 bg-[#0B1221] hover:bg-[#1EAEDB]/10 text-[#1EAEDB] border border-[#1EAEDB]/20 hover:border-[#1EAEDB]/40"
          variant="outline"
        >
          <Wallet className="h-4 w-4 mr-2" />
          Lead exclusif ({formatPrice(exclusivePrice)}€)
        </Button>
        
        <Button 
          size="lg" 
          onClick={() => onPurchase('exclusif', 'direct')}
          disabled={!canPurchaseExclusive}
          className="flex-1 bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Lead exclusif ({formatPrice(exclusivePrice)}€)
        </Button>
      </div>
    </div>
  );
};