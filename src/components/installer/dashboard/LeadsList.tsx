import { Lead } from "@/types/crm";
import { EmptyLeadState } from "./EmptyLeadState";
import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

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

  const handlePriceFilterChange = (value: "default" | "asc" | "desc") => {
    setPriceFilter(value);
  };

  const getProjectTypeLabel = (type: string) => {
    switch (type) {
      case "residential":
        return "Résidentiel";
      case "professional":
        return "Professionnel";
      default:
        return type;
    }
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
        {availableLeads.length > 0 ? (
          <Table>
            <TableHeader className="bg-background/40">
              <TableRow>
                {onLeadSelect && (
                  <TableHead className="w-[50px]">
                    <span className="sr-only">Sélection</span>
                  </TableHead>
                )}
                <TableHead>Type</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Prix</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availableLeads.map((lead) => (
                <TableRow key={lead.id} className="group hover:bg-primary/5">
                  {onLeadSelect && (
                    <TableCell>
                      <Checkbox
                        checked={selectedLeads.some(l => l.id === lead.id)}
                        onCheckedChange={() => onLeadSelect(lead)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {getProjectTypeLabel(lead.projectType)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {lead.postalCode.substring(0, 2)}
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <p className="truncate">{lead.description}</p>
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(lead.createdAt), { 
                      addSuffix: true,
                      locale: fr 
                    })}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {lead.price}€
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyLeadState />
        )}
      </ScrollArea>
    </div>
  );
};