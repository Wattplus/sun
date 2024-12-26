import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Lead, InstallerLeadStatus } from "@/types/crm";
import { useState } from "react";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { LeadTableHeader } from "./table/LeadTableHeader";
import { LeadTableRow } from "./table/LeadTableRow";
import { LeadsFilters } from "./LeadsFilters";
import { LeadsHeader } from "./LeadsHeader";
import { useLeadsSync } from "@/hooks/useLeadsSync";

export const PurchasedLeadsPage = () => {
  const { toast } = useToast();
  const { leads, isLoading, updateLead } = useLeadsSync();
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const [filters, setFilters] = useState({
    status: 'all' as 'all' | InstallerLeadStatus,
    projectType: 'all' as 'all' | string,
    city: ''
  });

  const filteredLeads = leads.filter(lead => {
    if (filters.status !== 'all' && lead.installerStatus !== filters.status) return false;
    if (filters.projectType !== 'all' && lead.projectType !== filters.projectType) return false;
    if (filters.city && !lead.city?.toLowerCase().includes(filters.city.toLowerCase())) return false;
    return true;
  });

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLeads(prev => 
      prev.find(l => l.id === lead.id) 
        ? prev.filter(l => l.id !== lead.id)
        : [...prev, lead]
    );
  };

  const handleStatusChange = (leadId: string, status: InstallerLeadStatus) => {
    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      updateLead({ ...lead, installerStatus: status });
    }
  };

  const handleDeleteSelected = () => {
    toast({
      title: "Suppression",
      description: `${selectedLeads.length} leads ont été supprimés`,
    });
    setSelectedLeads([]);
  };

  const handleExportCSV = () => {
    const csvContent = [
      ["Prénom", "Nom", "Email", "Téléphone", "Ville", "Type de projet", "Statut"],
      ...filteredLeads.map(lead => [
        lead.firstName,
        lead.lastName,
        lead.email,
        lead.phone,
        lead.city,
        lead.projectType,
        lead.installerStatus
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "leads.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export CSV",
      description: "Le fichier CSV a été téléchargé avec succès",
    });
  };

  const handleExportGoogleSheets = () => {
    toast({
      title: "Export Google Sheets",
      description: "Cette fonctionnalité sera bientôt disponible",
    });
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse text-primary">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <InstallerBreadcrumb />
      
      <div className="bg-background/95 backdrop-blur-sm border border-primary/10 rounded-lg shadow-lg">
        <div className="p-4 space-y-4">
          <LeadsHeader
            selectedLeads={selectedLeads}
            onDeleteSelected={handleDeleteSelected}
            onExportCSV={handleExportCSV}
            onExportGoogleSheets={handleExportGoogleSheets}
          />

          <LeadsFilters
            filters={filters}
            onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
          />

          <Card className="border-0 bg-background/60">
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="p-2">
                <Table>
                  <LeadTableHeader />
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <LeadTableRow
                        key={lead.id}
                        lead={lead}
                        isSelected={selectedLeads.some(l => l.id === lead.id)}
                        onSelect={handleLeadSelect}
                        onStatusChange={handleStatusChange}
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
};