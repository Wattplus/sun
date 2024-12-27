import { LeadTable } from "./sections/LeadTable";
import { useLeadsSync } from "@/hooks/useLeadsSync";
import { InstallerLayout } from "../navigation/InstallerLayout";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeadFilters } from "./sections/LeadFilters";
import { LeadStats } from "./sections/LeadStats";

export const PurchasedLeadsPage = () => {
  const { leads, isLoading } = useLeadsSync();

  const getStatusColor = (status: string) => {
    const colors = {
      nouveau: "bg-blue-500/10 text-blue-600",
      contacte: "bg-yellow-500/10 text-yellow-600",
      devis_envoye: "bg-purple-500/10 text-purple-600",
      rdv_planifie: "bg-orange-500/10 text-orange-600",
      negociation: "bg-indigo-500/10 text-indigo-600",
      signe: "bg-green-500/10 text-green-600",
      perdu: "bg-red-500/10 text-red-600",
    };
    return colors[status as keyof typeof colors] || colors.nouveau;
  };

  if (isLoading) {
    return (
      <InstallerLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-64 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </InstallerLayout>
    );
  }

  return (
    <InstallerLayout>
      <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
        <InstallerBreadcrumb />
        
        <div className="max-w-[1200px] mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">
              Mes Leads
            </h1>
            <p className="text-muted-foreground">
              Gérez vos leads et suivez leur progression
            </p>
          </div>

          <LeadStats leads={leads} />

          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">Tous les leads</TabsTrigger>
                <TabsTrigger value="new">Nouveaux</TabsTrigger>
                <TabsTrigger value="active">En cours</TabsTrigger>
                <TabsTrigger value="won">Gagnés</TabsTrigger>
                <TabsTrigger value="lost">Perdus</TabsTrigger>
              </TabsList>
            </div>

            <LeadFilters />

            <TabsContent value="all" className="space-y-4">
              <LeadTable leads={leads} getStatusColor={getStatusColor} />
            </TabsContent>

            <TabsContent value="new" className="space-y-4">
              <LeadTable 
                leads={leads.filter(lead => lead.installerStatus === 'nouveau')} 
                getStatusColor={getStatusColor} 
              />
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <LeadTable 
                leads={leads.filter(lead => 
                  ['contacte', 'devis_envoye', 'rdv_planifie', 'negociation'].includes(lead.installerStatus || '')
                )} 
                getStatusColor={getStatusColor} 
              />
            </TabsContent>

            <TabsContent value="won" className="space-y-4">
              <LeadTable 
                leads={leads.filter(lead => lead.installerStatus === 'signe')} 
                getStatusColor={getStatusColor} 
              />
            </TabsContent>

            <TabsContent value="lost" className="space-y-4">
              <LeadTable 
                leads={leads.filter(lead => lead.installerStatus === 'perdu')} 
                getStatusColor={getStatusColor} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </InstallerLayout>
  );
};