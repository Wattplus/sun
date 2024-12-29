import { Lead } from "@/types/crm";
import { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LeadsFilters } from "./LeadsFilters";
import { LeadsTable } from "./LeadsTable";

interface LeadsListProps {
  leads: Lead[];
  onLeadSelect?: (lead: Lead) => void;
  selectedLeads?: Lead[];
}

export const LeadsList = ({ leads, onLeadSelect, selectedLeads = [] }: LeadsListProps) => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<"default" | "asc" | "desc">("default");

  const availableDepartments = useMemo(() => {
    const departments = new Set<string>();
    leads.forEach(lead => {
      if (lead.postalcode && lead.postalcode.length >= 2) {
        departments.add(lead.postalcode.substring(0, 2));
      }
    });
    return Array.from(departments).sort();
  }, [leads]);

  let availableLeads = leads.filter(lead => !lead.purchasedby?.length);

  if (selectedDepartments.length > 0) {
    availableLeads = availableLeads.filter(lead => 
      selectedDepartments.includes(lead.postalcode.substring(0, 2))
    );
  }

  if (projectTypeFilter !== "all") {
    availableLeads = availableLeads.filter(lead => 
      lead.projectType === projectTypeFilter
    );
  }

  if (priceFilter !== "default") {
    availableLeads.sort((a, b) => {
      if (priceFilter === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  const handleDepartmentSelect = (department: string) => {
    if (department && !selectedDepartments.includes(department)) {
      setSelectedDepartments([...selectedDepartments, department]);
    }
  };

  const handleDepartmentRemove = (department: string) => {
    setSelectedDepartments(selectedDepartments.filter(d => d !== department));
  };

  const handleSelectAll = () => {
    // Implementation of select all functionality
  };

  return (
    <div className="space-y-4">
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

      <ScrollArea className="h-[500px] pr-4">
        <LeadsTable
          leads={availableLeads}
          selectedLeads={selectedLeads}
          onSelectAll={handleSelectAll}
          onSelectLead={onLeadSelect}
        />
      </ScrollArea>
    </div>
  );
};
