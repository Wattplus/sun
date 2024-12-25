import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrepaidBalance } from "./PrepaidBalance";
import { StatsCards } from "./StatsCards";
import { ProjectsList } from "./ProjectsList";
import { PurchasedLeads } from "./PurchasedLeads";
import { LeadsList } from "./LeadsList";
import { MessagesList } from "./MessagesList";
import { InstallerProfile } from "@/pages/InstallerProfile";
import { Card } from "@/components/ui/card";

export const DashboardTabs = () => {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
        <TabsTrigger value="dashboard">Accueil</TabsTrigger>
        <TabsTrigger value="leads">Leads</TabsTrigger>
        <TabsTrigger value="purchased">Leads Achetés</TabsTrigger>
        <TabsTrigger value="projects">Projets</TabsTrigger>
        <TabsTrigger value="messages">Messages</TabsTrigger>
        <TabsTrigger value="profile">Profil</TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        <div className="grid gap-6">
          <PrepaidBalance balance={150} />
          <StatsCards />
          <ProjectsList />
        </div>
      </TabsContent>

      <TabsContent value="leads">
        <LeadsList leads={[]} />
      </TabsContent>

      <TabsContent value="purchased">
        <PurchasedLeads leads={[]} />
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
  );
};