import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Home, Building2, Factory } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { LeadsFilters } from "@/components/installer/dashboard/LeadsFilters";
import { useState } from "react";

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

  if (isMobile) {
    return (
      <div className="space-y-4">
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

        <div className="space-y-4">
          {leads.map((lead) => (
            <Card key={lead.id} className="p-4 space-y-4 bg-background/50 backdrop-blur-sm border-primary/10">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="flex items-center gap-2 bg-primary/10 text-primary">
                  {getProjectIcon(lead.clienttype)}
                  <span>{getClientTypeLabel(lead.clienttype)}</span>
                </Badge>
                <Checkbox
                  checked={selectedLeads.some(l => l.id === lead.id)}
                  onCheckedChange={() => onLeadSelect(lead)}
                  className="border-primary/50"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Prénom:</span>
                  <p>{lead.firstname}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Code postal:</span>
                  <p>{lead.postalcode}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Facture:</span>
                  <p>{lead.monthlybill}€</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Prix:</span>
                  <p>{lead.price}€</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-primary/10">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-primary/10 hover:bg-primary/20 border-primary/20"
                  onClick={() => onLeadSelect(lead)}
                >
                  {selectedLeads.some(l => l.id === lead.id) ? "Désélectionner" : "Sélectionner"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

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

      <Card className="overflow-hidden border border-primary/20 bg-background/50 backdrop-blur-sm">
        <div className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Code postal</TableHead>
                  <TableHead>Facture mensuelle</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedLeads.some(l => l.id === lead.id)}
                        onCheckedChange={() => onLeadSelect(lead)}
                        className="border-primary/50"
                      />
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-2 bg-primary/10 text-primary">
                        {getProjectIcon(lead.clienttype)}
                        <span>
                          {getClientTypeLabel(lead.clienttype)}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>{lead.firstname}</TableCell>
                    <TableCell>{lead.lastname}</TableCell>
                    <TableCell>{lead.postalcode}</TableCell>
                    <TableCell>{lead.monthlybill}€</TableCell>
                    <TableCell>{lead.price}€</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Lock className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
};