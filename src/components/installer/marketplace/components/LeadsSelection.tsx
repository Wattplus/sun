import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet } from "lucide-react";

interface LeadsSelectionProps {
  selectedLeads: Lead[];
  onClearSelection: () => void;
  onPurchase: (paymentMethod: 'prepaid' | 'direct') => void;
  hasEnoughBalance: boolean;
  totalPrice: number;
}

export const LeadsSelection = ({ 
  selectedLeads, 
  onClearSelection, 
  onPurchase, 
  hasEnoughBalance,
  totalPrice
}: LeadsSelectionProps) => {
  if (selectedLeads.length === 0) return null;

  return (
    <Card className="p-4 border border-primary/20 bg-background/50 backdrop-blur-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} sélectionné{selectedLeads.length > 1 ? 's' : ''}
            </p>
            <p className="text-lg font-medium">Total: {totalPrice}€</p>
          </div>
          <Button 
            variant="outline"
            size="sm"
            className="text-sm"
            onClick={onClearSelection}
          >
            Tout désélectionner
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={() => onPurchase('prepaid')}
            className="flex-1 bg-primary hover:bg-primary/90 text-white gap-2"
            disabled={!hasEnoughBalance}
          >
            <Wallet className="h-4 w-4" />
            Acheter avec mon solde
            {hasEnoughBalance ? '' : ' (solde insuffisant)'}
          </Button>
          <Button 
            onClick={() => onPurchase('direct')}
            variant="outline"
            className="flex-1 border-primary/20 hover:bg-primary/10 gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Paiement direct
          </Button>
        </div>
      </div>
    </Card>
  );
};