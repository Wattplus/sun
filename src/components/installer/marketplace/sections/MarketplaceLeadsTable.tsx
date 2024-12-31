import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { LeadsFilters } from "@/components/installer/dashboard/LeadsFilters";
import { useState } from "react";
import { Building2, Factory, Home } from "lucide-react";
import { LeadMobileCard } from "../components/LeadMobileCard";
import { LeadDesktopTable } from "../components/LeadDesktopTable";

interface MarketplaceLeadsTableProps {
  leads: Lead[];
  selectedLeads: Lead[];
  onLeadSelect: (lead: Lead) => void;
  balance?: number;
}

export const MarketplaceLeadsTable = ({ 
  leads, 
  selectedLeads, 
  onLeadSelect,
}: MarketplaceLeadsTableProps) => {
  const isMobile = useIsMobile();
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<"default" | "asc" | "desc">("default");

  const availableDepartments = Array.from(
    new Set(leads.map(lead => lead.postalcode.substring(0, 2)))
  ).sort();

  const handleDepartmentSelect = (department: string) => {
    if (department && !selectedDepartments.includes(department)) {
      setSelectedDepartments([...selectedDepartments, department]);
    }
  };

  const handleDepartmentRemove = (department: string) => {
    setSelectedDepartments(selectedDepartments.filter(d => d !== department));
  };

  const getProjectIcon = (clientType: string) => {
    switch (clientType) {
      case 'professional':
        return <Building2 className="h-4 w-4" />;
      case 'industrial':
        return <Factory className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  const getClientTypeLabel = (clientType: string) => {
    switch (clientType) {
      case 'professional':
        return 'Professionnel';
      case 'industrial':
        return 'Industriel';
      default:
        return 'Résidentiel';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/20">
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

      {isMobile ? (
        <div className="space-y-4">
          {leads.map((lead) => (
            <LeadMobileCard
              key={lead.id}
              lead={lead}
              isSelected={selectedLeads.some(l => l.id === lead.id)}
              onSelect={onLeadSelect}
              getProjectIcon={getProjectIcon}
              getClientTypeLabel={getClientTypeLabel}
            />
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden border border-primary/20 bg-background/50 backdrop-blur-sm">
          <div className="p-6">
            <div className="overflow-x-auto">
              <LeadDesktopTable
                leads={leads}
                selectedLeads={selectedLeads}
                onSelectLead={onLeadSelect}
                getProjectIcon={getProjectIcon}
                getClientTypeLabel={getClientTypeLabel}
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};