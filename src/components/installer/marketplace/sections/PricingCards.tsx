import { User, Building2, ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PricingCardsProps {
  hasEnoughBalance: boolean;
  onPurchase: () => void;
}

export const PricingCards = ({ hasEnoughBalance, onPurchase }: PricingCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/10 hover:scale-105 transition-all duration-300">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-medium text-white">Lead Particulier</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">{hasEnoughBalance ? '26' : '35'}€</span>
              <span className="text-sm text-white/60">{hasEnoughBalance ? 'avec compte prépayé' : 'prix standard'}</span>
            </div>
            {!hasEnoughBalance && (
              <p className="text-sm text-primary/80">Économisez en rechargeant votre compte !</p>
            )}
          </div>
          <Button 
            onClick={onPurchase}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!hasEnoughBalance}
          >
            {hasEnoughBalance ? (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Acheter
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Recharger pour acheter
              </>
            )}
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/10 hover:scale-105 transition-all duration-300">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-medium text-white">Lead Pro</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">{hasEnoughBalance ? '49' : '59'}€</span>
              <span className="text-sm text-white/60">{hasEnoughBalance ? 'avec compte prépayé' : 'prix standard'}</span>
            </div>
            {!hasEnoughBalance && (
              <p className="text-sm text-primary/80">Économisez en rechargeant votre compte !</p>
            )}
          </div>
          <Button 
            onClick={onPurchase}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!hasEnoughBalance}
          >
            {hasEnoughBalance ? (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Acheter
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Recharger pour acheter
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};