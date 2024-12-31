import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Euro, 
  CreditCard, 
  Info, 
  ShoppingCart, 
  Wallet,
  Building2,
  Home,
  Factory
} from "lucide-react";
import { Lead } from "@/types/crm";

interface MarketplaceBalanceProps {
  balance: number;
  selectedLeads: Lead[];
  onPurchase: () => void;
}

export const MarketplaceBalance = ({
  balance,
  selectedLeads,
  onPurchase
}: MarketplaceBalanceProps) => {
  const totalPrice = selectedLeads.reduce((sum, lead) => sum + (lead.price || 0), 0);
  const hasEnoughBalance = balance >= totalPrice;

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'residential':
        return <Home className="h-4 w-4" />;
      case 'professional':
        return <Building2 className="h-4 w-4" />;
      case 'industrial':
        return <Factory className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  return (
    <Card className="p-4 sm:p-6 bg-background/50 backdrop-blur-sm border-primary/10">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            <h3 className="text-base sm:text-lg font-medium">Solde disponible</h3>
          </div>
          <span className="text-xl sm:text-2xl font-bold">{balance}€</span>
        </div>

        {selectedLeads.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-primary/10">
            <div className="space-y-2">
              {selectedLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {getProjectIcon(lead.clienttype)}
                    <span className="truncate">
                      {lead.firstname} {lead.lastname} - {lead.postalcode}
                    </span>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 ml-2">
                    {lead.price}€
                  </Badge>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-primary/10">
              <span className="font-medium">Total</span>
              <span className="font-bold">{totalPrice}€</span>
            </div>

            <div className="space-y-2">
              <Button
                onClick={onPurchase}
                className="w-full"
                disabled={!hasEnoughBalance}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Acheter les leads
              </Button>

              {!hasEnoughBalance && (
                <div className="flex items-center gap-2 text-sm text-yellow-500">
                  <Info className="h-4 w-4" />
                  <span>Solde insuffisant</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button variant="outline" className="w-full">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payer par carte
                </Button>
                <Button variant="outline" className="w-full">
                  <Euro className="h-4 w-4 mr-2" />
                  Compte prépayé
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};