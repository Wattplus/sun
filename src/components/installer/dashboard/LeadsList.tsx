import { Lead } from "@/types/crm";
import { LeadCard } from "@/components/admin/marketplace/LeadCard";
import { EmptyLeadState } from "./EmptyLeadState";
import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, ChevronRight } from "lucide-react";

interface LeadsListProps {
  leads: Lead[];
}

type SortOrder = "default" | "asc" | "desc";

export const LeadsList = ({ leads }: LeadsListProps) => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<SortOrder>("default");

  const availableDepartments = useMemo(() => {
    const departments = new Set<string>();
    leads.forEach(lead => {
      if (lead.postalCode && lead.postalCode.length >= 2) {
        departments.add(lead.postalCode.substring(0, 2));
      }
    });
    return Array.from(departments).sort();
  }, [leads]);

  let availableLeads = leads.filter(lead => !lead.purchasedBy?.length);

  if (selectedDepartments.length > 0) {
    availableLeads = availableLeads.filter(lead => 
      selectedDepartments.includes(lead.postalCode.substring(0, 2))
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

  const removeDepartment = (department: string) => {
    setSelectedDepartments(selectedDepartments.filter(d => d !== department));
  };

  const handlePriceFilterChange = (value: string) => {
    setPriceFilter(value as SortOrder);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#1EAEDB]">
          Nouveaux Leads Disponibles
        </h2>
        <button className="flex items-center gap-2 px-6 py-2 text-white bg-[#1EAEDB] rounded-lg hover:bg-[#33C3F0] transition-colors duration-200">
          Voir tout
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <Card className="p-6 bg-[#0B1221]/80 border-[#1EAEDB]/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1EAEDB]">
              Départements
            </label>
            <Select onValueChange={handleDepartmentSelect}>
              <SelectTrigger className="bg-[#0B1221] border-[#1EAEDB]/20 text-white">
                <SelectValue placeholder="Sélectionner un département" />
              </SelectTrigger>
              <SelectContent className="bg-[#0B1221] border-[#1EAEDB]/20">
                {availableDepartments.map((dept) => (
                  <SelectItem 
                    key={dept} 
                    value={dept}
                    className="text-white hover:bg-[#1EAEDB]/20"
                  >
                    Département {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedDepartments.map((dept) => (
                <Badge 
                  key={dept}
                  className="bg-[#1EAEDB]/20 text-[#1EAEDB] border-[#1EAEDB]/20 flex items-center gap-1"
                >
                  Dép. {dept}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-white" 
                    onClick={() => removeDepartment(dept)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1EAEDB]">
              Type de projet
            </label>
            <Select value={projectTypeFilter} onValueChange={setProjectTypeFilter}>
              <SelectTrigger className="bg-[#0B1221] border-[#1EAEDB]/20 text-white">
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent className="bg-[#0B1221] border-[#1EAEDB]/20">
                <SelectItem value="all" className="text-white hover:bg-[#1EAEDB]/20">
                  Tous les types
                </SelectItem>
                <SelectItem value="residential" className="text-white hover:bg-[#1EAEDB]/20">
                  Résidentiel
                </SelectItem>
                <SelectItem value="professional" className="text-white hover:bg-[#1EAEDB]/20">
                  Professionnel
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1EAEDB]">
              Prix
            </label>
            <Select value={priceFilter} onValueChange={handlePriceFilterChange}>
              <SelectTrigger className="bg-[#0B1221] border-[#1EAEDB]/20 text-white">
                <SelectValue placeholder="Par défaut" />
              </SelectTrigger>
              <SelectContent className="bg-[#0B1221] border-[#1EAEDB]/20">
                <SelectItem value="default" className="text-white hover:bg-[#1EAEDB]/20">
                  Par défaut
                </SelectItem>
                <SelectItem value="asc" className="text-white hover:bg-[#1EAEDB]/20">
                  Prix croissant
                </SelectItem>
                <SelectItem value="desc" className="text-white hover:bg-[#1EAEDB]/20">
                  Prix décroissant
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableLeads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            onPurchase={() => {}}
            subscriptionTier="free"
          />
        ))}
      </div>

      {availableLeads.length === 0 && <EmptyLeadState />}
    </div>
  );
};