import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { PurchasedLeads } from "../PurchasedLeads";
import { useIsMobile } from "@/hooks/use-mobile";

interface AllPurchasedLeadsProps {
  onClose: () => void;
}

export const AllPurchasedLeads = ({ onClose }: AllPurchasedLeadsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold">Tous Mes Leads Achetés</h2>
        <Button 
          variant="ghost" 
          onClick={onClose}
          className="gap-2"
          size={isMobile ? "sm" : "default"}
        >
          <X className="h-4 w-4" />
          {!isMobile && "Fermer"}
        </Button>
      </div>
      <Card className="p-4 md:p-6">
        <PurchasedLeads />
      </Card>
    </div>
  );
};