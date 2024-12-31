import { useNewLeads } from "@/hooks/useNewLeads";
import { Card } from "@/components/ui/card";
import { LeadsTable } from "./components/LeadsTable";
import { LeadsHeader } from "./components/LeadsHeader";
import { LeadAgeTabs } from "./components/LeadAgeTabs";
import { LeadsSelection } from "./components/LeadsSelection";
import { LeadsSummaryCards } from "./components/LeadsSummaryCards";
import { NewLeadsContent } from "./components/NewLeadsContent";
import { useState } from "react";

export const NewLeadsPage = () => {
  const {
    selectedLeads,
    showFilters,
    projectTypeFilter,
    selectedDepartments,
    priceFilter,
    balance,
    leads,
    hasEnoughBalance,
    setShowFilters,
    setProjectTypeFilter,
    setSelectedDepartments,
    setPriceFilter,
    handleLeadSelect,
    handleSelectAll,
    handlePurchase,
    calculateTotalPrice,
  } = useNewLeads();

  const [activeTab, setActiveTab] = useState("new");

  const availableDepartments = Array.from(
    new Set(leads.map((lead) => lead.postalcode.substring(0, 2)))
  ).sort();

  const handlePrepaidAccount = () => {
    window.location.href = '/espace-installateur/compte/prepaye';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/95 to-background">
      <div className="max-w-[1400px] mx-auto p-6 space-y-8">
        <div className="space-y-6">
          <LeadsHeader 
            onToggleFilters={() => setShowFilters(!showFilters)}
            onPrepaidAccount={handlePrepaidAccount}
          />

          <LeadAgeTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        <NewLeadsContent
          showFilters={showFilters}
          availableDepartments={availableDepartments}
          selectedDepartments={selectedDepartments}
          projectTypeFilter={projectTypeFilter}
          priceFilter={priceFilter}
          onDepartmentSelect={(dept) => setSelectedDepartments([...selectedDepartments, dept])}
          onDepartmentRemove={(dept) => setSelectedDepartments(selectedDepartments.filter(d => d !== dept))}
          onProjectTypeChange={setProjectTypeFilter}
          onPriceFilterChange={setPriceFilter}
          selectedLeads={selectedLeads}
          onClearSelection={() => handleSelectAll()}
          onPurchase={handlePurchase}
          hasEnoughBalance={hasEnoughBalance}
          totalPrice={calculateTotalPrice()}
          availableLeads={leads}
          balance={balance}
          onPrepaidAccount={handlePrepaidAccount}
          onSelectAll={handleSelectAll}
          onSelectLead={handleLeadSelect}
        />
      </div>
    </div>
  );
};