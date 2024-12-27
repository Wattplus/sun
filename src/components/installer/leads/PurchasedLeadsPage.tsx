import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useLeadsSync } from "@/hooks/useLeadsSync";
import { InstallerLayout } from "../navigation/InstallerLayout";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { LeadStats } from "./sections/LeadStats";
import { LeadFilters } from "./sections/LeadFilters";
import { LeadTable } from "./sections/LeadTable";

export const PurchasedLeadsPage = () => {
  const { leads, isLoading } = useLeadsSync();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "nouveau":
        return "bg-blue-500/10 text-blue-600";
      case "contacte":
        return "bg-purple-500/10 text-purple-600";
      case "devis_envoye":
        return "bg-amber-500/10 text-amber-600";
      case "rdv_planifie":
        return "bg-emerald-500/10 text-emerald-600";
      case "negociation":
        return "bg-orange-500/10 text-orange-600";
      case "signe":
        return "bg-green-500/10 text-green-600";
      case "perdu":
        return "bg-red-500/10 text-red-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  // Filtrage des leads
  const filteredLeads = leads?.filter(lead => {
    const matchesSearch = searchTerm === "" || 
      lead.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.city?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || lead.installerStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <InstallerLayout>
      <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
        <InstallerBreadcrumb />
        <div className="max-w-[1600px] mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">
              Mes Leads Achetés
            </h1>
            <p className="text-muted-foreground">
              Gérez et suivez vos leads achetés de manière efficace
            </p>
          </div>

          <LeadStats leads={leads} />

          <Card className="p-6">
            <LeadFilters
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              onSearchChange={setSearchTerm}
              onStatusFilterChange={setStatusFilter}
            />

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <LeadTable 
                leads={filteredLeads} 
                getStatusColor={getStatusColor}
              />
            )}
          </Card>
        </div>
      </div>
    </InstallerLayout>
  );
};