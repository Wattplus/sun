import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrepaidBalance } from "./PrepaidBalance";
import { StatsCards } from "./StatsCards";
import { ProjectsList } from "./ProjectsList";
import { PurchasedLeads } from "./PurchasedLeads";
import { LeadsList } from "./LeadsList";
import { MessagesList } from "./MessagesList";
import { InstallerProfile } from "@/pages/InstallerProfile";
import { Card } from "@/components/ui/card";
import { mockAvailableLeads } from "./mockAvailableLeads";
import { mockPurchasedLeads } from "./mockPurchasedLeads";

export const DashboardTabs = () => {
  return (
    <div className="space-y-6">
      <PrepaidBalance balance={150} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nouveaux leads disponibles */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Nouveaux Leads Disponibles</h2>
          <LeadsList leads={mockAvailableLeads} />
        </Card>

        {/* Leads achetés */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Mes Leads Achetés</h2>
          <PurchasedLeads leads={mockPurchasedLeads} />
        </Card>
      </div>

      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
          <TabsTrigger value="projects">Projets</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="profile">Profil</TabsTrigger>
        </TabsList>

        <TabsContent value="stats">
          <div className="grid gap-6">
            <StatsCards />
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <ProjectsList />
        </TabsContent>

        <TabsContent value="messages">
          <Card className="p-6">
            <MessagesList />
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <InstallerProfile />
        </TabsContent>
      </Tabs>
    </div>
  );
};