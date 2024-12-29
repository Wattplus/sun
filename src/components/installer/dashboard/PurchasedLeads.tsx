import { Lead } from "@/types/crm";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import { StatsCards } from "./leads/StatsCards";
import { SearchFilters } from "./leads/SearchFilters";
import { LeadsTableMobile } from "./leads/LeadsTableMobile";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

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

  const filteredLeads = localLeads.filter(lead => {
    const matchesSearch = 
      lead.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.postalcode.includes(searchTerm);

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

      <Card className="p-6">
        <div className="mb-6">
          <SearchFilters
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onSearchChange={setSearchTerm}
            onStatusChange={setStatusFilter}
          />
        </div>

        {isMobile ? (
          <LeadsTableMobile
            leads={filteredLeads}
            getStatusColor={(status) => {
              switch (status) {
                case 'nouveau': return 'bg-blue-500/5 text-blue-600 border-blue-200/20';
                case 'contacte': return 'bg-yellow-500/5 text-yellow-600 border-yellow-200/20';
                case 'devis_envoye': return 'bg-purple-500/5 text-purple-600 border-purple-200/20';
                case 'rdv_planifie': return 'bg-green-500/5 text-green-600 border-green-200/20';
                case 'negociation': return 'bg-orange-500/5 text-orange-600 border-orange-200/20';
                case 'signe': return 'bg-emerald-500/5 text-emerald-600 border-emerald-200/20';
                case 'perdu': return 'bg-red-500/5 text-red-600 border-red-200/20';
                default: return 'bg-gray-500/5 text-gray-600 border-gray-200/20';
              }
            }}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <div className="rounded-lg border border-border/50">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-muted/5">
                  <TableHead className="w-[150px]">Type de projet</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Code postal</TableHead>
                  <TableHead>Type de toit</TableHead>
                  <TableHead>Facture mensuelle</TableHead>
                  <TableHead className="w-[150px]">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-muted/5">
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${lead.projectType === 'professional' 
                            ? 'bg-amber-500/5 text-amber-600 border-amber-200/20' 
                            : 'bg-emerald-500/5 text-emerald-600 border-emerald-200/20'
                          }
                        `}
                      >
                        {lead.projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{lead.firstname}</TableCell>
                    <TableCell>{lead.lastname}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/5 border-primary/20">
                        {lead.postalcode}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {lead.roofType || "Non renseigné"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {lead.monthlybill || "Non renseigné"}
                    </TableCell>
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
      </Card>
    </div>
  );
};
