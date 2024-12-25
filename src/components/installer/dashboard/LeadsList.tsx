import { Lead } from "@/types/crm";
import { LeadCard } from "@/components/admin/marketplace/LeadCard";
import { EmptyLeadState } from "./EmptyLeadState";
import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface LeadsListProps {
  leads: Lead[];
}

export const LeadsList = ({ leads }: LeadsListProps) => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<"default" | "asc" | "desc">("default");

  // Extraire tous les départements uniques des leads
  const availableDepartments = useMemo(() => {
    const departments = new Set<string>();
    leads.forEach(lead => {
      if (lead.postalCode && lead.postalCode.length >= 2) {
        departments.add(lead.postalCode.substring(0, 2));
      }
    });
    return Array.from(departments).sort();
  }, [leads]);

  // Filtrer les leads qui n'ont pas encore été achetés
  let availableLeads = leads.filter(lead => !lead.purchasedBy?.length);

  // Appliquer les filtres
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

  if (availableLeads.length === 0) {
    return <EmptyLeadState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#1EAEDB]">Nouveaux Leads Disponibles</h2>
        <button className="text-[#1EAEDB] hover:text-[#33C3F0] flex items-center gap-2">
          Voir tout
          <span className="text-xl">→</span>
        </button>
      </div>

      <Card className="p-4 bg-[#0B1221]/80 border-[#1EAEDB]/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block text-[#1EAEDB]">
              Départements
            </label>
            <div className="space-y-2">
              <Select 
                value={selectedDepartments[selectedDepartments.length - 1] || "select"} 
                onValueChange={handleDepartmentSelect}
              >
                <SelectTrigger className="bg-[#0B1221] border-[#1EAEDB]/20 text-white">
                  <SelectValue placeholder="Sélectionner un département" />
                </SelectTrigger>
                <SelectContent className="bg-[#0B1221] border-[#1EAEDB]/20">
                  <SelectItem value="select" disabled>Sélectionner un département</SelectItem>
                  {availableDepartments.map((dept) => (
                    <SelectItem key={dept} value={dept} className="text-white hover:bg-[#1EAEDB]/20">
                      Département {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2">
                {selectedDepartments.map((dept) => (
                  <Badge 
                    key={dept} 
                    variant="secondary" 
                    className="bg-[#1EAEDB]/20 text-[#1EAEDB] border-[#1EAEDB]/20 flex items-center gap-1"
                  >
                    Dép. {dept}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-white" 
                      onClick={() => removeDepartment(dept)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block text-[#1EAEDB]">
              Type de projet
            </label>
            <Select value={projectTypeFilter} onValueChange={setProjectTypeFilter}>
              <SelectTrigger className="bg-[#0B1221] border-[#1EAEDB]/20 text-white">
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent className="bg-[#0B1221] border-[#1EAEDB]/20">
                <SelectItem value="all" className="text-white hover:bg-[#1EAEDB]/20">Tous les types</SelectItem>
                <SelectItem value="residential" className="text-white hover:bg-[#1EAEDB]/20">Résidentiel</SelectItem>
                <SelectItem value="commercial" className="text-white hover:bg-[#1EAEDB]/20">Professionnel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block text-[#1EAEDB]">
              Prix
            </label>
            <Select 
              value={priceFilter} 
              onValueChange={(value: "default" | "asc" | "desc") => setPriceFilter(value)}
            >
              <SelectTrigger className="bg-[#0B1221] border-[#1EAEDB]/20 text-white">
                <SelectValue placeholder="Par défaut" />
              </SelectTrigger>
              <SelectContent className="bg-[#0B1221] border-[#1EAEDB]/20">
                <SelectItem value="default" className="text-white hover:bg-[#1EAEDB]/20">Par défaut</SelectItem>
                <SelectItem value="asc" className="text-white hover:bg-[#1EAEDB]/20">Prix croissant</SelectItem>
                <SelectItem value="desc" className="text-white hover:bg-[#1EAEDB]/20">Prix décroissant</SelectItem>
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
    </div>
  );
};