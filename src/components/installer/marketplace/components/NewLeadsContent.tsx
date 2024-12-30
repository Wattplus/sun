import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { LeadsFilters } from "../../dashboard/LeadsFilters";
import { LeadsSelection } from "./LeadsSelection";
import { LeadsSummaryCards } from "./LeadsSummaryCards";
import { LeadsTable } from "./LeadsTable";

interface NewLeadsContentProps {
  showFilters: boolean;
  availableDepartments: string[];
  selectedDepartments: string[];
  projectTypeFilter: string;
  priceFilter: "default" | "asc" | "desc";
  onDepartmentSelect: (dept: string) => void;
  onDepartmentRemove: (dept: string) => void;
  onProjectTypeChange: (value: string) => void;
  onPriceFilterChange: (value: "default" | "asc" | "desc") => void;
  selectedLeads: Lead[];
  onClearSelection: () => void;
  onPurchase: (method: 'prepaid' | 'direct') => void;
  hasEnoughBalance: boolean;
  totalPrice: number;
  availableLeads: Lead[];
  balance: number;
  onPrepaidAccount: () => void;
  onSelectAll: () => void;
  onSelectLead: (lead: Lead) => void;
}

export const NewLeadsContent = ({
  showFilters,
  availableDepartments,
  selectedDepartments,
  projectTypeFilter,
  priceFilter,
  onDepartmentSelect,
  onDepartmentRemove,
  onProjectTypeChange,
  onPriceFilterChange,
  selectedLeads,
  onClearSelection,
  onPurchase,
  hasEnoughBalance,
  totalPrice,
  availableLeads,
  balance,
  onPrepaidAccount,
  onSelectAll,
  onSelectLead,
}: NewLeadsContentProps) => {
  return (
    <>
      {showFilters && (
        <Card className="p-4 border border-primary/20 bg-background/50 backdrop-blur-sm">
          <LeadsFilters
            availableDepartments={availableDepartments}
            selectedDepartments={selectedDepartments}
            projectTypeFilter={projectTypeFilter}
            priceFilter={priceFilter}
            onDepartmentSelect={onDepartmentSelect}
            onDepartmentRemove={onDepartmentRemove}
            onProjectTypeChange={onProjectTypeChange}
            onPriceFilterChange={onPriceFilterChange}
          />
        </Card>
      )}

      <LeadsSelection 
        selectedLeads={selectedLeads}
        onClearSelection={onClearSelection}
        onPurchase={onPurchase}
        hasEnoughBalance={hasEnoughBalance}
        totalPrice={totalPrice}
      />
      
      <LeadsSummaryCards 
        availableLeads={availableLeads}
        selectedLeads={selectedLeads}
        balance={balance}
        onPrepaidAccount={onPrepaidAccount}
      />

      <Card className="overflow-hidden border border-primary/20 bg-background/50 backdrop-blur-sm">
        <div className="p-6">
          <div className="overflow-x-auto">
            <LeadsTable 
              leads={availableLeads}
              selectedLeads={selectedLeads}
              onSelectAll={onSelectAll}
              onSelectLead={onSelectLead}
            />
          </div>
        </div>
      </Card>
    </>
  );
};