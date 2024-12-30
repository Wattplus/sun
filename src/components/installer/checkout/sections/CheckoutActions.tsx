import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";

interface CheckoutActionsProps {
  isLoading: boolean;
  onCheckout: () => void;
  leadsCount: number;
}

export const CheckoutActions = ({ isLoading, onCheckout }: CheckoutActionsProps) => {
  return (
    <div className="space-y-4">
      <Button
        onClick={onCheckout}
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Traitement en cours...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-5 w-5" />
            Procéder au paiement
          </>
        )}
      </Button>
      <p className="text-center text-sm text-white/60">
        En cliquant sur "Procéder au paiement", vous acceptez nos conditions générales de vente
      </p>
    </div>
  );
};