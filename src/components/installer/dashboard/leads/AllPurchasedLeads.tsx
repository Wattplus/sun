import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { PurchasedLeads } from "../PurchasedLeads";
import { Lead } from "@/types/crm";

interface AllPurchasedLeadsProps {
  leads: Lead[];
  onClose: () => void;
}

export const AllPurchasedLeads = ({ leads, onClose }: AllPurchasedLeadsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Tous Mes Leads Achetés</h2>
        <Button 
          variant="ghost" 
          onClick={onClose}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Fermer
        </Button>
      </div>
      <Card className="p-6">
        <PurchasedLeads leads={leads} />
      </Card>
    </div>
  );
};