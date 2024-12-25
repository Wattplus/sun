import { useState } from "react";
import { LeadsList } from "../dashboard/LeadsList";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Lead } from "@/types/crm";
import { ShoppingCart, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function NewLeadsPage() {
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const { toast } = useToast();

  const handleLeadSelect = (lead: Lead) => {
    if (selectedLeads.find(l => l.id === lead.id)) {
      setSelectedLeads(selectedLeads.filter(l => l.id !== lead.id));
    } else {
      setSelectedLeads([...selectedLeads, lead]);
    }
  };

  const calculateTotalPrice = () => {
    return selectedLeads.reduce((total, lead) => total + lead.price, 0);
  };

  const handleBulkPurchase = async () => {
    if (selectedLeads.length === 0) {
      toast({
        title: "Aucun lead sélectionné",
        description: "Veuillez sélectionner au moins un lead à acheter.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Here we would normally make an API call to process the bulk purchase
      toast({
        title: "Achat en cours",
        description: `Traitement de l'achat de ${selectedLeads.length} leads...`,
      });

      // Simulate API call success
      setTimeout(() => {
        toast({
          title: "Achat réussi !",
          description: `${selectedLeads.length} leads ont été ajoutés à votre portefeuille.`,
        });
        setSelectedLeads([]);
      }, 1500);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'achat des leads.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <InstallerBreadcrumb />
      <div className="max-w-[1600px] mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Nouveaux Leads Disponibles
            </h1>
            <p className="text-primary/60 mt-2">
              Sélectionnez les leads qui vous intéressent pour un achat groupé
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-primary/60">Total sélectionné</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10">
                  <Package className="w-4 h-4 mr-1" />
                  {selectedLeads.length} leads
                </Badge>
                <Badge variant="outline" className="bg-primary/10">
                  {calculateTotalPrice()}€
                </Badge>
              </div>
            </div>
            
            <Button
              onClick={handleBulkPurchase}
              className="flex items-center gap-2"
              disabled={selectedLeads.length === 0}
            >
              <ShoppingCart className="w-4 h-4" />
              Acheter la sélection
            </Button>
          </div>
        </div>
        
        <div className="glass-panel p-6">
          <LeadsList 
            leads={mockAvailableLeads}
            onLeadSelect={handleLeadSelect}
            selectedLeads={selectedLeads}
          />
        </div>
      </div>
    </div>
  );
}