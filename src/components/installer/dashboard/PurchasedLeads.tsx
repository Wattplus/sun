import { Lead } from "@/types/crm";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { mockPurchasedLeads } from "./mockPurchasedLeads";
import { useMediaQuery } from "@/hooks/use-media-query";
import { StatsCards } from "./leads/StatsCards";
import { SearchFilters } from "./leads/SearchFilters";
import { LeadsTableMobile } from "./leads/LeadsTableMobile";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const PurchasedLeads = ({ leads }: { leads: Lead[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [localLeads, setLocalLeads] = useState<Lead[]>(leads);
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleStatusChange = (leadId: string, newStatus: Lead['installerStatus']) => {
    setLocalLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? { ...lead, installerStatus: newStatus } 
          : lead
      )
    );
    
    toast({
      title: "Statut mis à jour",
      description: "Le statut du lead a été mis à jour avec succès",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nouveau': return 'bg-blue-500/10 text-blue-600';
      case 'contacte': return 'bg-yellow-500/10 text-yellow-600';
      case 'devis_envoye': return 'bg-purple-500/10 text-purple-600';
      case 'rdv_planifie': return 'bg-green-500/10 text-green-600';
      case 'negociation': return 'bg-orange-500/10 text-orange-600';
      case 'signe': return 'bg-emerald-500/10 text-emerald-600';
      case 'perdu': return 'bg-red-500/10 text-red-600';
      default: return 'bg-gray-500/10 text-gray-600';
    }
  };

  const filteredLeads = localLeads.filter(lead => {
    const matchesSearch = 
      lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.postalCode.includes(searchTerm);

    const matchesStatus = statusFilter === "all" || lead.installerStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: filteredLeads.length,
    contacted: filteredLeads.filter(lead => lead.installerStatus === 'contacte').length,
    converted: filteredLeads.filter(lead => lead.installerStatus === 'signe').length,
    lost: filteredLeads.filter(lead => lead.installerStatus === 'perdu').length,
    totalInvestment: filteredLeads.reduce((acc, lead) => acc + (lead.price || 0), 0),
    averagePrice: filteredLeads.length > 0 
      ? Math.round(filteredLeads.reduce((acc, lead) => acc + (lead.price || 0), 0) / filteredLeads.length) 
      : 0
  };

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />

      <SearchFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
      />

      {isMobile ? (
        <LeadsTableMobile
          leads={filteredLeads}
          getStatusColor={getStatusColor}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type de projet</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Code postal</TableHead>
                <TableHead>Type de toit</TableHead>
                <TableHead>Facture mensuelle</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={lead.projectType === 'professional' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}
                    >
                      {lead.projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.firstName}</TableCell>
                  <TableCell>{lead.lastName}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{lead.postalCode}</TableCell>
                  <TableCell>{lead.roofType || "Non renseigné"}</TableCell>
                  <TableCell>{lead.monthlyBill || "Non renseigné"}</TableCell>
                  <TableCell>
                    <Select 
                      value={lead.installerStatus || 'nouveau'} 
                      onValueChange={(value) => handleStatusChange(lead.id, value as Lead['installerStatus'])}
                    >
                      <SelectTrigger className={`w-[140px] ${getStatusColor(lead.installerStatus || 'nouveau')}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nouveau">Nouveau</SelectItem>
                        <SelectItem value="contacte">Contacté</SelectItem>
                        <SelectItem value="devis_envoye">Devis envoyé</SelectItem>
                        <SelectItem value="rdv_planifie">RDV planifié</SelectItem>
                        <SelectItem value="negociation">En négociation</SelectItem>
                        <SelectItem value="signe">Signé</SelectItem>
                        <SelectItem value="perdu">Perdu</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};