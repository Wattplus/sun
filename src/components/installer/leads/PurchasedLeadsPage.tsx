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

export const PurchasedLeadsPage = () => {
  const { toast } = useToast();
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const [leadStatuses, setLeadStatuses] = useState<Record<string, InstallerLeadStatus>>(
    Object.fromEntries(mockPurchasedLeads.map(lead => [lead.id, lead.installerStatus || 'nouveau']))
  );

  const handleLeadSelect = (lead: Lead) => {
    if (selectedLeads.find(l => l.id === lead.id)) {
      setSelectedLeads(selectedLeads.filter(l => l.id !== lead.id));
    } else {
      setSelectedLeads([...selectedLeads, lead]);
    }
  };

  const handleStatusChange = (leadId: string, status: InstallerLeadStatus) => {
    setLeadStatuses(prev => ({ ...prev, [leadId]: status }));
    toast({
      title: "Statut mis à jour",
      description: "Le statut du lead a été mis à jour avec succès",
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
    const leads = selectedLeads.length > 0 ? selectedLeads : mockPurchasedLeads;
    const headers = ['Nom', 'Prénom', 'Email', 'Téléphone', 'Adresse', 'Code Postal', 'Ville', 'Type de projet', 'Statut'];
    const data = leads.map(lead => [
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
        <Card className="p-6">
          <ScrollArea className="h-[calc(100vh-250px)]">
            <Table>
              <LeadTableHeader />
              <TableBody>
                {mockPurchasedLeads.map((lead) => (
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