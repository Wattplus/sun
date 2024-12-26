import { Table, TableBody } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockPurchasedLeads } from "../dashboard/mockPurchasedLeads";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { LeadTableHeader } from "./table/LeadTableHeader";
import { LeadTableRow } from "./table/LeadTableRow";
import { useState } from "react";
import { Lead, InstallerLeadStatus } from "@/types/crm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PurchasedLeadsPage = () => {
  const { toast } = useToast();
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const [leads, setLeads] = useState(mockPurchasedLeads);
  const [leadStatuses, setLeadStatuses] = useState<Record<string, InstallerLeadStatus>>(
    Object.fromEntries(mockPurchasedLeads.map(lead => [lead.id, lead.installerStatus || 'nouveau']))
  );
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

  const handleStatusChange = (leadId: string, status: InstallerLeadStatus) => {
    // Mettre à jour le statut dans l'état local
    setLeadStatuses(prev => ({ ...prev, [leadId]: status }));
    
    // Mettre à jour le lead dans la liste
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? { ...lead, installerStatus: status }
          : lead
      )
    );

    // Afficher une notification
    toast({
      title: "Statut mis à jour",
      description: `Le statut du lead a été changé en "${status}"`,
    });
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
      leadStatuses[lead.id]
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

  return (
    <div className="space-y-6">
      <InstallerBreadcrumb />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Mes Leads Achetés
          </h1>
          <div className="flex gap-4">
            {selectedLeads.length > 0 && (
              <Button
                variant="outline"
                onClick={handleDeleteSelected}
                className="gap-2 border-destructive/20 hover:border-destructive/40 hover:bg-destructive/10 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Supprimer ({selectedLeads.length})
              </Button>
            )}
            <Button
              variant="outline"
              onClick={exportToCSV}
              className="gap-2 border-primary/20 hover:border-primary/40 hover:bg-primary/10"
            >
              <Download className="h-4 w-4 text-primary" />
              Exporter CSV
            </Button>
            <Button
              variant="outline"
              onClick={exportToGoogleSheets}
              className="gap-2 border-primary/20 hover:border-primary/40 hover:bg-primary/10"
            >
              <FileSpreadsheet className="h-4 w-4 text-primary" />
              Google Sheets
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <Select
            value={filters.status}
            onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="nouveau">Nouveau lead</SelectItem>
              <SelectItem value="contacte">Contacté</SelectItem>
              <SelectItem value="devis_envoye">Devis envoyé</SelectItem>
              <SelectItem value="rdv_planifie">RDV planifié</SelectItem>
              <SelectItem value="negociation">En négociation</SelectItem>
              <SelectItem value="signe">Signé</SelectItem>
              <SelectItem value="perdu">Perdu</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.projectType}
            onValueChange={(value) => setFilters(prev => ({ ...prev, projectType: value }))}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Type de projet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="residential">Résidentiel</SelectItem>
              <SelectItem value="professional">Professionnel</SelectItem>
            </SelectContent>
          </Select>

          <input
            type="text"
            placeholder="Rechercher par ville"
            className="px-3 py-2 rounded-md border border-input bg-background"
            value={filters.city}
            onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
          />
        </div>

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