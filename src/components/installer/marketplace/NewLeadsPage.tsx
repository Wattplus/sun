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
import { LeadsFilters } from "../dashboard/LeadsFilters";

export const NewLeadsPage = () => {
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [projectTypeFilter, setProjectTypeFilter] = useState("all");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<"default" | "asc" | "desc">("default");
  
  const balance = 150;
  const hasEnoughBalance = balance >= selectedLeads.length * 26;

  const availableDepartments = Array.from(new Set(mockAvailableLeads.map(lead => lead.postalCode.substring(0, 2))));

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

  const handleDepartmentSelect = (department: string) => {
    if (!selectedDepartments.includes(department)) {
      setSelectedDepartments([...selectedDepartments, department]);
    }
  };

  const handleDepartmentRemove = (department: string) => {
    setSelectedDepartments(selectedDepartments.filter(d => d !== department));
  };

  const filteredLeads = mockAvailableLeads
    .filter(lead => {
      if (projectTypeFilter !== "all") {
        return lead.projectType === projectTypeFilter;
      }
      return true;
    })
    .filter(lead => {
      if (selectedDepartments.length > 0) {
        return selectedDepartments.includes(lead.postalCode.substring(0, 2));
      }
      return true;
    })
    .sort((a, b) => {
      if (priceFilter === "asc") {
        return a.price - b.price;
      } else if (priceFilter === "desc") {
        return b.price - a.price;
      }
      return 0;
    });

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
                onClick={() => setShowFilters(!showFilters)}
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

          {showFilters && (
            <Card className="p-4 border border-primary/20 bg-background/50 backdrop-blur-sm">
              <LeadsFilters
                availableDepartments={availableDepartments}
                selectedDepartments={selectedDepartments}
                projectTypeFilter={projectTypeFilter}
                priceFilter={priceFilter}
                onDepartmentSelect={handleDepartmentSelect}
                onDepartmentRemove={handleDepartmentRemove}
                onProjectTypeChange={setProjectTypeFilter}
                onPriceFilterChange={setPriceFilter}
              />
            </Card>
          )}

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
                  leads={filteredLeads}
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