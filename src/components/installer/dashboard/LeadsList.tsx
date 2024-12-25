import { Lead } from "@/types/crm";
import { LeadCard } from "@/components/admin/marketplace/LeadCard";
import { EmptyLeadState } from "./EmptyLeadState";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
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
  const [priceFilter, setPriceFilter] = useState<"all" | "asc" | "desc">("all");

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

  if (priceFilter !== "all") {
    availableLeads.sort((a, b) => {
      if (priceFilter === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  const handleDepartmentSelect = (department: string) => {
    if (!selectedDepartments.includes(department)) {
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
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block text-muted-foreground">
              Départements
            </label>
            <div className="space-y-2">
              <Select 
                value={selectedDepartments[selectedDepartments.length - 1] || ""} 
                onValueChange={handleDepartmentSelect}
              >
                <SelectTrigger>
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
                  <Badge key={dept} variant="secondary" className="flex items-center gap-1">
                    Dép. {dept}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeDepartment(dept)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block text-muted-foreground">
              Type de projet
            </label>
            <Select value={projectTypeFilter} onValueChange={setProjectTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="residential">Résidentiel</SelectItem>
                <SelectItem value="commercial">Professionnel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block text-muted-foreground">
              Prix
            </label>
            <Select 
              value={priceFilter} 
              onValueChange={(value: "all" | "asc" | "desc") => setPriceFilter(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Trier par prix" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Par défaut</SelectItem>
                <SelectItem value="asc">Prix croissant</SelectItem>
                <SelectItem value="desc">Prix décroissant</SelectItem>
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