import { ScrollArea } from "@/components/ui/scroll-area";
import { Lead } from "@/types/crm";
import { useState } from "react";
import { EmptyLeadState } from "./EmptyLeadState";
import { mockPurchasedLeads } from "./mockPurchasedLeads";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Users, Phone, FileCheck2, Ban } from "lucide-react";

interface PurchasedLeadsProps {
  leads?: Lead[];
}

export const PurchasedLeads = ({ leads = mockPurchasedLeads }: PurchasedLeadsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [localLeads, setLocalLeads] = useState<Lead[]>(leads);
  const { toast } = useToast();

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

  const getProjectTypeBadge = (type: string) => {
    return (
      <Badge 
        variant="outline" 
        className={type === 'professional' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}
      >
        {type === 'professional' ? 'Professionnel' : 'Résidentiel'}
      </Badge>
    );
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
  };

  if (localLeads.length === 0) {
    return <EmptyLeadState />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center space-x-4">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Leads</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center space-x-4">
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <Phone className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Contactés</p>
            <p className="text-2xl font-bold">{stats.contacted}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center space-x-4">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <FileCheck2 className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Convertis</p>
            <p className="text-2xl font-bold">{stats.converted}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center space-x-4">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <Ban className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Perdus</p>
            <p className="text-2xl font-bold">{stats.lost}</p>
          </div>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher un lead..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="nouveau">Nouveau</SelectItem>
            <SelectItem value="contacte">Contacté</SelectItem>
            <SelectItem value="devis_envoye">Devis envoyé</SelectItem>
            <SelectItem value="rdv_planifie">RDV planifié</SelectItem>
            <SelectItem value="negociation">En négociation</SelectItem>
            <SelectItem value="signe">Signé</SelectItem>
            <SelectItem value="perdu">Perdu</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{getProjectTypeBadge(lead.projectType)}</TableCell>
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
                <TableCell>
                  <Select>
                    <SelectTrigger className="w-[40px]">
                      <SelectValue placeholder="..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="edit">Modifier</SelectItem>
                      <SelectItem value="delete">Supprimer</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};