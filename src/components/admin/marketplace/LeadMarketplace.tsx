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
import { BalanceSection } from "@/components/installer/marketplace/sections/BalanceSection";
import { BottomCTA } from "@/components/installer/marketplace/sections/BottomCTA";

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

  const handlePrepaidAccount = () => {
    window.location.href = '/espace-installateur/compte/prepaye';
  };

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <AdminBreadcrumb />
      
      <div className="space-y-6">
        <BalanceSection 
          balance={150} 
          onPrepaidAccount={handlePrepaidAccount}
        />

        <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/10">
          <div className="space-y-6">
            <MarketplaceHeader availableLeads={availableLeads.length} />

            <LeadAgeTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="space-y-4">
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
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

              <MarketplaceSelection 
                selectedLeads={selectedLeads}
                onBulkPurchase={handleBulkPurchase}
                totalPrice={totalPrice}
              />

              <MarketplaceStats availableLeads={availableLeads} />

              <MarketplaceGrid 
                availableLeads={availableLeads}
                purchasedLeads={purchasedLeads}
                onPurchase={handlePurchase}
              />
            </div>
          </div>
        </Card>

        <BottomCTA onPrepaidAccount={handlePrepaidAccount} />
      </div>
    </div>
  );
};