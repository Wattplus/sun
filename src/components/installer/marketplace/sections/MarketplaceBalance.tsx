import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Euro, CreditCard, Info, ShoppingCart } from "lucide-react";
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
  const rechargeAmounts = [50, 100, 200, 500, 1000, 1500];
  const totalPrice = selectedLeads.reduce((sum, lead) => sum + lead.price, 0);

  return (
    <>
      <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Euro className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Solde disponible</p>
                <p className="text-3xl font-bold text-primary">{balance}€</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">Options de rechargement</p>
            <div className="grid grid-cols-3 gap-2">
              {rechargeAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  className="w-full bg-primary/5 hover:bg-primary/10 border-primary/20"
                >
                  {amount}€
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {selectedLeads.length > 0 && (
        <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <ShoppingCart className="h-5 w-5" />
              <h3 className="font-medium">Panier ({selectedLeads.length})</h3>
            </div>
            <div className="space-y-2">
              {selectedLeads.map(lead => (
                <div key={lead.id} className="flex justify-between text-sm">
                  <span>{lead.firstname} {lead.lastname}</span>
                  <span className="font-medium">{lead.price}€</span>
                </div>
              ))}
              <div className="border-t border-primary/10 pt-2 mt-2 flex justify-between font-medium">
                <span>Total</span>
                <span className="text-primary">{totalPrice}€</span>
              </div>
            </div>
            <Button 
              onClick={onPurchase}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Procéder au paiement
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/10">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Info className="h-5 w-5" />
            <h3 className="font-medium">Pourquoi acheter ces leads ?</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <Badge variant="secondary" className="h-6 w-6 rounded-full p-1 bg-primary/10">
                1
              </Badge>
              Leads qualifiés et vérifiés
            </li>
            <li className="flex items-center gap-3">
              <Badge variant="secondary" className="h-6 w-6 rounded-full p-1 bg-primary/10">
                2
              </Badge>
              Projets à fort potentiel
            </li>
            <li className="flex items-center gap-3">
              <Badge variant="secondary" className="h-6 w-6 rounded-full p-1 bg-primary/10">
                3
              </Badge>
              Contact rapide recommandé
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
};