import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Lead } from "@/types/crm";
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
    status: 'all',
    projectType: 'all',
    city: ''
  });

  const filteredLeads = leads.filter(lead => {
    if (filters.status !== 'all' && lead.installerStatus !== filters.status) return false;
    if (filters.projectType !== 'all' && lead.projectType !== filters.projectType) return false;
    if (filters.city && !lead.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    return true;
  });

  const handleLeadSelect = (lead: Lead) => {
    if (selectedLeads.find(l => l.id === lead.id)) {
      setSelectedLeads(selectedLeads.filter(l => l.id !== lead.id));
    } else {
      setSelectedLeads([...selectedLeads, lead]);
    }
  };

  const handleStatusChange = (leadId: string, status: string) => {
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

  const exportToCSV = () => {
    const leadsToExport = selectedLeads.length > 0 ? selectedLeads : leads;
    const headers = ['Nom', 'Prénom', 'Email', 'Téléphone', 'Adresse', 'Code Postal', 'Ville', 'Type de projet', 'Statut'];
    const data = leadsToExport.map(lead => [
      lead.lastName,
      lead.firstName,
      lead.email,
      lead.phone,
      lead.address,
      lead.postalCode,
      lead.city,
      lead.projectType === 'residential' ? 'Résidentiel' : 'Professionnel',
      lead.installerStatus
    ]);

    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'leads_achetes.csv';
    link.click();
    
    toast({
      title: "Export réussi",
      description: "Le fichier CSV a été téléchargé",
    });
  };

  const exportToGoogleSheets = () => {
    toast({
      title: "Google Sheets",
      description: "Export vers Google Sheets à venir",
    });
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <InstallerBreadcrumb />
      <div className="p-6 space-y-6">
        <LeadsHeader
          selectedLeads={selectedLeads}
          onDeleteSelected={handleDeleteSelected}
          onExportCSV={exportToCSV}
          onExportGoogleSheets={exportToGoogleSheets}
        />

        <LeadsFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <Card className="p-6">
          <ScrollArea className="h-[calc(100vh-250px)]">
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
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};