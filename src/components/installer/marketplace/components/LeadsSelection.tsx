import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LeadsSelectionProps {
  selectedLeads: Lead[];
  onClearSelection: () => void;
  onPurchase: () => void;
  hasEnoughBalance: boolean;
}

export const LeadsSelection = ({ selectedLeads, onClearSelection, onPurchase, hasEnoughBalance }: LeadsSelectionProps) => {
  if (selectedLeads.length === 0) return null;

  return (
    <Card className="p-4 border border-primary/20 bg-background/50 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} sélectionné{selectedLeads.length > 1 ? 's' : ''}
          </p>
          <p className="text-lg font-medium">Total: {selectedLeads.length * 26}€</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            size="sm"
            className="text-sm"
            onClick={onClearSelection}
          >
            Tout désélectionner
          </Button>
          <Button 
            onClick={onPurchase}
            className="bg-primary hover:bg-primary/90 text-white gap-2"
            size="sm"
            disabled={!hasEnoughBalance}
          >
            Acheter la sélection
          </Button>
        </div>
      </div>
    </Card>
  );
};