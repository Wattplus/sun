import { useState } from "react";
import { Lead } from "@/types/crm";
import { InstallerLayout } from "../../navigation/InstallerLayout";
import { Card } from "@/components/ui/card";
import { mockAvailableLeads } from "../mockAvailableLeads";
import { toast } from "sonner";
import { LeadsTable } from "../LeadsTable";
import { LeadsFilters } from "../LeadsFilters";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from "lucide-react";

export const AllAvailableLeads = () => {
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const [projectTypeFilter, setProjectTypeFilter] = useState("all");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<"default" | "asc" | "desc">("default");
  
  const availableDepartments = Array.from(new Set(mockAvailableLeads.map(lead => lead.postalCode.substring(0, 2))));

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLeads(prev => 
      prev.some(l => l.id === lead.id)
        ? prev.filter(l => l.id !== lead.id)
        : [...prev, lead]
    );
  };

  const handleSelectAll = () => {
    setSelectedLeads(prev => 
      prev.length === mockAvailableLeads.length ? [] : [...mockAvailableLeads]
    );
  };

  const handlePurchase = () => {
    if (selectedLeads.length === 0) {
      toast.error("Veuillez sélectionner au moins un lead");
      return;
    }

    const totalPrice = selectedLeads.reduce((sum, lead) => sum + lead.price, 0);
    toast.success(`Redirection vers le paiement pour ${selectedLeads.length} leads (${totalPrice}€)`);
  };

  const filteredLeads = mockAvailableLeads
    .filter(lead => projectTypeFilter === "all" || lead.projectType === projectTypeFilter)
    .filter(lead => selectedDepartments.length === 0 || selectedDepartments.includes(lead.postalCode.substring(0, 2)))
    .sort((a, b) => {
      if (priceFilter === "asc") return a.price - b.price;
      if (priceFilter === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="space-y-6">
      {selectedLeads.length > 0 && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">
                {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} sélectionné{selectedLeads.length > 1 ? 's' : ''}
              </h3>
              <p className="text-sm text-muted-foreground">
                Total: {selectedLeads.reduce((sum, lead) => sum + lead.price, 0)}€
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedLeads([])}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Tout désélectionner
              </Button>
              <Button 
                size="sm"
                onClick={handlePurchase}
                className="gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Acheter la sélection
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6 border-primary/20">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Tous les leads disponibles</h2>
          </div>

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

          <div className="rounded-md border">
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
  );
};