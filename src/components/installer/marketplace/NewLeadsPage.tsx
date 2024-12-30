import { useNewLeads } from "@/hooks/useNewLeads";
import { LeadsHeader } from "./components/LeadsHeader";
import { NewLeadsContent } from "./components/NewLeadsContent";
import { useNavigate } from "react-router-dom";

export const NewLeadsPage = () => {
  const navigate = useNavigate();
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
    calculateTotalPrice,
  } = useNewLeads();

  const availableLeads = leads.filter(lead => !lead.purchasedby?.length);
  console.log("[NewLeadsPage] Available leads:", availableLeads.length);

  const handlePrepaidAccount = () => {
    window.location.href = '/espace-installateur/compte/prepaye';
  };

  const handleExport = () => {
    console.log("Export functionality to be implemented");
  };

  const handlePurchase = () => {
    const leadIds = selectedLeads.map(lead => lead.id).join(",");
    navigate(`/espace-installateur/checkout?leads=${leadIds}`);
  };

  const availableDepartments = Array.from(
    new Set(availableLeads.map(lead => lead.postalcode.substring(0, 2)))
  );

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
          onPrepaidAccount={handlePrepaidAccount}
          onExport={handleExport}
        />

        <NewLeadsContent
          showFilters={showFilters}
          availableDepartments={availableDepartments}
          selectedDepartments={selectedDepartments}
          projectTypeFilter={projectTypeFilter}
          priceFilter={priceFilter}
          onDepartmentSelect={(dept) => setSelectedDepartments(prev => [...prev, dept])}
          onDepartmentRemove={(dept) => setSelectedDepartments(prev => prev.filter(d => d !== dept))}
          onProjectTypeChange={setProjectTypeFilter}
          onPriceFilterChange={setPriceFilter}
          selectedLeads={selectedLeads}
          onClearSelection={() => handleSelectAll()}
          onPurchase={handlePurchase}
          hasEnoughBalance={hasEnoughBalance}
          totalPrice={calculateTotalPrice()}
          availableLeads={filteredLeads}
          balance={balance}
          onPrepaidAccount={handlePrepaidAccount}
          onSelectAll={handleSelectAll}
          onSelectLead={handleLeadSelect}
        />
      </div>
    </div>
  );
};