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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronRight, X } from "lucide-react";

export const DashboardTabs = () => {
  const [showAllPurchasedLeads, setShowAllPurchasedLeads] = useState(false);

  if (showAllPurchasedLeads) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Tous Mes Leads Achetés</h2>
          <Button 
            variant="ghost" 
            onClick={() => setShowAllPurchasedLeads(false)}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Fermer
          </Button>
        </div>
        <Card className="p-6">
          <PurchasedLeads leads={mockPurchasedLeads} />
        </Card>
      </div>
    );
  }

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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Mes Leads Achetés</h2>
            <Button 
              variant="default"
              onClick={() => setShowAllPurchasedLeads(true)}
              className="gap-2 bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm"
            >
              Voir tout
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <PurchasedLeads leads={mockPurchasedLeads.slice(0, 2)} />
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