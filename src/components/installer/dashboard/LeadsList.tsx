import { Lead } from "@/types/crm";
import { LeadCard } from "@/components/admin/marketplace/LeadCard";
import { EmptyLeadState } from "./EmptyLeadState";
import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const handlePriceFilterChange = (value: SortOrder) => {
    setPriceFilter(value);
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-background/40 border-primary/20">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Départements
            </label>
            <Select onValueChange={handleDepartmentSelect}>
              <SelectTrigger className="bg-background/60 border-primary/20">
                <SelectValue placeholder="Sélectionner un département" />
              </SelectTrigger>
              <SelectContent>
                {availableDepartments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
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
                  className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1"
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
            <label className="text-sm font-medium text-primary">
              Type de projet
            </label>
            <Select value={projectTypeFilter} onValueChange={setProjectTypeFilter}>
              <SelectTrigger className="bg-background/60 border-primary/20">
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="residential">Résidentiel</SelectItem>
                <SelectItem value="professional">Professionnel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Prix
            </label>
            <Select value={priceFilter} onValueChange={handlePriceFilterChange}>
              <SelectTrigger className="bg-background/60 border-primary/20">
                <SelectValue placeholder="Par défaut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Par défaut</SelectItem>
                <SelectItem value="asc">Prix croissant</SelectItem>
                <SelectItem value="desc">Prix décroissant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-4">
          {availableLeads.length > 0 ? (
            availableLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onPurchase={() => {}}
                subscriptionTier="free"
              />
            ))
          ) : (
            <EmptyLeadState />
          )}
        </div>
      </ScrollArea>
    </div>
  );
};