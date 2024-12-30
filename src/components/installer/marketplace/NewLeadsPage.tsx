import { useState } from "react";
import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { LeadsTable } from "./components/LeadsTable";
import { LeadsSummaryCards } from "./components/LeadsSummaryCards";
import { LeadsFilters } from "../dashboard/LeadsFilters";
import { LeadsHeader } from "./components/LeadsHeader";
import { LeadsSelection } from "./components/LeadsSelection";
import { useLeadOperations } from "@/hooks/useLeadOperations";

export const NewLeadsPage = () => {
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [projectTypeFilter, setProjectTypeFilter] = useState("all");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<"default" | "asc" | "desc">("default");
  
  const { leads } = useLeadOperations();
  const availableLeads = leads.filter(lead => !lead.purchasedby?.length);
  
  const balance = 150; // TODO: Fetch from Supabase
  const hasEnoughBalance = balance >= selectedLeads.length * 26;

  console.log("[NewLeadsPage] Available leads:", availableLeads.length);
  
  const availableDepartments = Array.from(
    new Set(availableLeads.map(lead => lead.postalcode.substring(0, 2)))
  );

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLeads(prev => 
      prev.some(l => l.id === lead.id)
        ? prev.filter(l => l.id !== lead.id)
        : [...prev, lead]
    );
  };

  const handleSelectAll = () => {
    setSelectedLeads(prev => 
      prev.length === availableLeads.length ? [] : [...availableLeads]
    );
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

  const filteredLeads = availableLeads
    .filter(lead => projectTypeFilter === "all" || lead.clienttype === projectTypeFilter)
    .filter(lead => selectedDepartments.length === 0 || selectedDepartments.includes(lead.postalcode.substring(0, 2)))
    .sort((a, b) => {
      if (priceFilter === "asc") return (a.price || 0) - (b.price || 0);
      if (priceFilter === "desc") return (b.price || 0) - (a.price || 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/95 to-background">
      <div className="max-w-[1400px] mx-auto p-6 space-y-8">
        <LeadsHeader 
          onToggleFilters={() => setShowFilters(!showFilters)}
          onExport={handleExport}
          onPrepaidAccount={handlePrepaidAccount}
        />

        {showFilters && (
          <Card className="p-4 border border-primary/20 bg-background/50 backdrop-blur-sm">
            <LeadsFilters
              availableDepartments={availableDepartments}
              selectedDepartments={selectedDepartments}
              projectTypeFilter={projectTypeFilter}
              priceFilter={priceFilter}
              onDepartmentSelect={(dept) => setSelectedDepartments(prev => [...prev, dept])}
              onDepartmentRemove={(dept) => setSelectedDepartments(prev => prev.filter(d => d !== dept))}
              onProjectTypeChange={setProjectTypeFilter}
              onPriceFilterChange={setPriceFilter}
            />
          </Card>
        )}

        <LeadsSelection 
          selectedLeads={selectedLeads}
          onClearSelection={() => setSelectedLeads([])}
          onPurchase={handlePurchase}
          hasEnoughBalance={hasEnoughBalance}
        />
        
        <LeadsSummaryCards 
          availableLeads={availableLeads}
          selectedLeads={selectedLeads}
          balance={balance}
          onPrepaidAccount={handlePrepaidAccount}
        />

        <Card className="overflow-hidden border border-primary/20 bg-background/50 backdrop-blur-sm">
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
  );
};