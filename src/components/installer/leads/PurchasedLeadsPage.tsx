import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { PurchasedLeads } from "../dashboard/PurchasedLeads";
import { LeadStats } from "./sections/LeadStats";
import { LeadTable } from "./sections/LeadTable";
import { mockPurchasedLeads } from "../dashboard/mockPurchasedLeads";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Search } from "lucide-react";

export function PurchasedLeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredLeads = mockPurchasedLeads.filter(lead => {
    const matchesSearch = 
      lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.postalCode.includes(searchTerm);

    const matchesStatus = filterStatus === "all" || lead.installerStatus === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 space-y-8">
      <InstallerBreadcrumb />
      
      <div className="container mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Leads achetés</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher un lead..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
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
        </div>

        <LeadStats leads={filteredLeads} />

        <Card className="p-6">
          <LeadTable 
            leads={filteredLeads} 
            getStatusColor={(status) => {
              switch (status) {
                case 'nouveau': return 'text-blue-600 bg-blue-100';
                case 'contacte': return 'text-yellow-600 bg-yellow-100';
                case 'devis_envoye': return 'text-purple-600 bg-purple-100';
                case 'rdv_planifie': return 'text-green-600 bg-green-100';
                case 'negociation': return 'text-orange-600 bg-orange-100';
                case 'signe': return 'text-emerald-600 bg-emerald-100';
                case 'perdu': return 'text-red-600 bg-red-100';
                default: return 'text-gray-600 bg-gray-100';
              }
            }}
          />
        </Card>
      </div>
    </div>
  );
}