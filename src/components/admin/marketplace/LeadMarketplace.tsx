import { AdminBreadcrumb } from "../AdminBreadcrumb";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { mockLeads, Lead } from "@/types/crm";
import { LeadsFilters } from "@/components/installer/dashboard/LeadsFilters";
import { Card } from "@/components/ui/card";
import { LeadAgeTabs } from "@/components/installer/marketplace/components/LeadAgeTabs";
import { MarketplaceHeader } from "./sections/MarketplaceHeader";
import { MarketplaceStats } from "./sections/MarketplaceStats";
import { MarketplaceSelection } from "./sections/MarketplaceSelection";
import { MarketplaceGrid } from "./sections/MarketplaceGrid";

export const LeadMarketplace = () => {
  const { toast } = useToast();
  const [purchasedLeads, setPurchasedLeads] = useState<string[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<"default" | "asc" | "desc">("default");
  const [activeTab, setActiveTab] = useState("new");

  const availableDepartments = Array.from(
    new Set(mockLeads.map(lead => lead.postalcode.substring(0, 2)))
  ).sort();

  const availableLeads = mockLeads.filter(lead => {
    if (projectTypeFilter !== 'all' && lead.projectType !== projectTypeFilter) return false;
    if (selectedDepartments.length > 0 && !selectedDepartments.includes(lead.postalcode.substring(0, 2))) return false;
    return lead.status === "qualified";
  });

  const handlePurchase = (lead: Lead) => {
    setPurchasedLeads(prev => [...prev, lead.id]);
    toast({
      title: "Lead acheté avec succès",
      description: `Le lead ${lead.firstname} ${lead.lastname} a été ajouté à votre liste.`,
    });
  };

  const handleBulkPurchase = () => {
    selectedLeads.forEach(lead => handlePurchase(lead));
    setSelectedLeads([]);
  };

  const handleDepartmentSelect = (department: string) => {
    if (department && !selectedDepartments.includes(department)) {
      setSelectedDepartments([...selectedDepartments, department]);
    }
  };

  const handleDepartmentRemove = (department: string) => {
    setSelectedDepartments(selectedDepartments.filter(d => d !== department));
  };

  const totalPrice = selectedLeads.reduce((sum, lead) => sum + (lead.price || 0), 0);

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <AdminBreadcrumb />
      
      <div className="bg-gradient-to-r from-background/90 to-background rounded-xl border border-primary/20">
        <MarketplaceHeader availableLeads={availableLeads} />

        <div className="px-8 mb-8">
          <LeadAgeTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="px-8 mb-6">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
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
        </div>

        <div className="px-8 mb-6">
          <MarketplaceSelection 
            selectedLeads={selectedLeads}
            onBulkPurchase={handleBulkPurchase}
            totalPrice={totalPrice}
          />
        </div>

        <div className="px-8 mb-8">
          <MarketplaceStats availableLeads={availableLeads} />
        </div>

        <div className="px-8 pb-8">
          <MarketplaceGrid 
            availableLeads={availableLeads}
            purchasedLeads={purchasedLeads}
            onPurchase={handlePurchase}
          />
        </div>
      </div>
    </div>
  );
};