import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Lead } from "@/types/crm";

interface MarketplaceSelectionProps {
  selectedLeads: Lead[];
  onBulkPurchase: () => void;
  totalPrice: number;
}

export const MarketplaceSelection = ({ 
  selectedLeads, 
  onBulkPurchase,
  totalPrice 
}: MarketplaceSelectionProps) => {
  if (selectedLeads.length === 0) return null;

  return (
    <Card className="p-6 bg-primary/5 border-primary/20">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">
            {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} sélectionné{selectedLeads.length > 1 ? 's' : ''}
          </h3>
          <p className="text-muted-foreground">Total: {totalPrice}€</p>
        </div>
        <Button 
          onClick={onBulkPurchase}
          className="bg-primary hover:bg-primary-dark text-white px-6"
          size="lg"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Acheter la sélection
        </Button>
      </div>
    </Card>
  );
};