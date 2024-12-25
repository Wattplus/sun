import { Button } from "@/components/ui/button";
import { Wallet, CreditCard } from "lucide-react";

interface LeadCardActionsProps {
  onPurchase: (type: 'mutualise' | 'exclusif', paymentMethod: 'prepaid' | 'direct') => void;
  mutualPrice: number;
  exclusivePrice: number;
  canPurchaseMutual: boolean;
  canPurchaseExclusive: boolean;
  isProfessionalProject: boolean;
}

export const LeadCardActions = ({
  onPurchase,
  mutualPrice,
  exclusivePrice,
  canPurchaseMutual,
  canPurchaseExclusive,
  isProfessionalProject,
}: LeadCardActionsProps) => {
  return (
    <div className="space-y-4">
      {/* Lead Mutualisé */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#1EAEDB]">Lead Mutualisé</span>
          <span className="text-sm font-bold text-white">{mutualPrice}€</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="w-full bg-[#1EAEDB]/10 hover:bg-[#1EAEDB]/20 border-[#1EAEDB]/20 hover:border-[#1EAEDB]/40"
            onClick={() => onPurchase('mutualise', 'prepaid')}
            disabled={!canPurchaseMutual}
          >
            <Wallet className="w-4 h-4 mr-2" />
            Solde prépayé
          </Button>
          <Button
            variant="outline"
            className="w-full bg-[#1EAEDB]/10 hover:bg-[#1EAEDB]/20 border-[#1EAEDB]/20 hover:border-[#1EAEDB]/40"
            onClick={() => onPurchase('mutualise', 'direct')}
            disabled={!canPurchaseMutual}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Payer
          </Button>
        </div>
      </div>

      {/* Lead Exclusif */}
      {!isProfessionalProject && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#1EAEDB]">Lead Exclusif</span>
            <span className="text-sm font-bold text-white">{exclusivePrice}€</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="w-full bg-[#1EAEDB]/10 hover:bg-[#1EAEDB]/20 border-[#1EAEDB]/20 hover:border-[#1EAEDB]/40"
              onClick={() => onPurchase('exclusif', 'prepaid')}
              disabled={!canPurchaseExclusive}
            >
              <Wallet className="w-4 h-4 mr-2" />
              Solde prépayé
            </Button>
            <Button
              variant="outline"
              className="w-full bg-[#1EAEDB]/10 hover:bg-[#1EAEDB]/20 border-[#1EAEDB]/20 hover:border-[#1EAEDB]/40"
              onClick={() => onPurchase('exclusif', 'direct')}
              disabled={!canPurchaseExclusive}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Payer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};