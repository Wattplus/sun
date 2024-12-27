import { useState } from "react";
import { Lead } from "@/types/crm";
import { Filter, Download, Wallet, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { InstallerLayout } from "../navigation/InstallerLayout";
import { Card } from "@/components/ui/card";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { toast } from "sonner";
import { LeadsTable } from "./components/LeadsTable";
import { LeadsSummaryCards } from "./components/LeadsSummaryCards";

export const NewLeadsPage = () => {
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const balance = 150;
  const hasEnoughBalance = balance >= selectedLeads.length * 26;

  const handleLeadSelect = (lead: Lead) => {
    if (selectedLeads.some(l => l.id === lead.id)) {
      setSelectedLeads(selectedLeads.filter(l => l.id !== lead.id));
    } else {
      setSelectedLeads([...selectedLeads, lead]);
    }
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === mockAvailableLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads([...mockAvailableLeads]);
    }
  };

  const handlePurchase = () => {
    if (!hasEnoughBalance) {
      toast.error("Solde insuffisant", {
        description: "Veuillez recharger votre compte pour acheter ces leads.",
      });
      return;
    }
    toast.success("Redirection vers le paiement...");
  };

  const handleExport = () => {
    if (selectedLeads.length === 0) {
      toast.error("Aucun lead sélectionné", {
        description: "Veuillez sélectionner au moins un lead à exporter.",
      });
      return;
    }
    toast.success("Export des leads en cours...");
  };

  const handlePrepaidAccount = () => {
    toast.success("Redirection vers la page de rechargement...");
  };

  return (
    <InstallerLayout>
      <div className="min-h-screen bg-gradient-to-b from-background/95 to-background">
        <div className="max-w-[1400px] mx-auto p-6 space-y-8">
          <div className="flex items-center justify-between">
            <InstallerBreadcrumb />
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="gap-2 bg-primary/10 hover:bg-primary/20 border-primary/20"
              >
                <Filter className="w-4 h-4" />
                Filtrer
              </Button>
              <Button 
                variant="outline" 
                className="gap-2 bg-primary/10 hover:bg-primary/20 border-primary/20" 
                onClick={handleExport}
              >
                <Download className="w-4 h-4" />
                Exporter
              </Button>
              <Button
                variant="outline"
                className="gap-2 bg-primary/10 hover:bg-primary/20 border-primary/20"
                onClick={handlePrepaidAccount}
              >
                <Wallet className="w-4 h-4" />
                Recharger
              </Button>
            </div>
          </div>

          {selectedLeads.length > 0 && (
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
                    onClick={() => setSelectedLeads([])}
                  >
                    Tout désélectionner
                  </Button>
                  <Button 
                    onClick={handlePurchase}
                    className="bg-primary hover:bg-primary/90 text-white gap-2"
                    size="sm"
                    disabled={!hasEnoughBalance}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {hasEnoughBalance ? "Acheter la sélection" : "Recharger pour acheter"}
                  </Button>
                </div>
              </div>
            </Card>
          )}
          
          <LeadsSummaryCards 
            availableLeads={mockAvailableLeads}
            selectedLeads={selectedLeads}
            balance={balance}
            onPrepaidAccount={handlePrepaidAccount}
          />

          <Card className="overflow-hidden border border-primary/10 bg-background/50 backdrop-blur-sm">
            <div className="p-6">
              <div className="overflow-x-auto">
                <LeadsTable 
                  leads={mockAvailableLeads}
                  selectedLeads={selectedLeads}
                  onSelectAll={handleSelectAll}
                  onSelectLead={handleLeadSelect}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </InstallerLayout>
  );
};