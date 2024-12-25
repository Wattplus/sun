import { useState } from "react";
import { Lead, mockLeads } from "@/types/crm";
import { LeadCard } from "./LeadCard";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const LeadMarketplace = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const { toast } = useToast();

  const handlePurchase = (lead: Lead) => {
    setSelectedLead(lead);
    setPurchaseDialogOpen(true);
  };

  const confirmPurchase = () => {
    if (!selectedLead) return;

    // TODO: Intégrer avec le système de paiement réel
    toast({
      title: "Lead acheté avec succès",
      description: "Vous pouvez maintenant voir les coordonnées complètes du contact.",
    });

    setLeads(leads.map(l => 
      l.id === selectedLead.id 
        ? { ...l, status: "assigned" as const } 
        : l
    ));
    setPurchaseDialogOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Marketplace des Leads</h2>
        <p className="text-gray-600">Découvrez et achetez des leads qualifiés</p>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leads
            .filter(lead => lead.status === "new")
            .map(lead => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onPurchase={handlePurchase}
                showFullDetails={lead.status === "assigned"}
              />
            ))}
        </div>
      </ScrollArea>

      <Dialog open={purchaseDialogOpen} onOpenChange={setPurchaseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer l'achat</DialogTitle>
            <DialogDescription>
              Voulez-vous acheter ce lead pour {selectedLead?.price}€ ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPurchaseDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={confirmPurchase}>
              Confirmer l'achat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};