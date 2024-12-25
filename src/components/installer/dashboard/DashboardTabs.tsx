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
import { SubscriptionPlans } from "../subscription/SubscriptionPlans";
import { ClientFAQ } from "@/components/client/faq/ClientFAQ";

export const DashboardTabs = () => {
  const [showAllPurchasedLeads, setShowAllPurchasedLeads] = useState(false);
  const [showAllAvailableLeads, setShowAllAvailableLeads] = useState(false);

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

  if (showAllAvailableLeads) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Tous Les Leads Disponibles</h2>
          <Button 
            variant="ghost" 
            onClick={() => setShowAllAvailableLeads(false)}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Fermer
          </Button>
        </div>
        <Card className="p-6 glass-panel">
          <LeadsList leads={mockAvailableLeads} />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6">
        <StatsCards />
      </div>

      <PrepaidBalance balance={150} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Nouveaux leads disponibles */}
        <Card className="p-8 glass-panel border-2 border-primary/20 hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Nouveaux Leads Disponibles
            </h2>
            <Button 
              variant="default"
              onClick={() => setShowAllAvailableLeads(true)}
              className="gap-2 bg-primary hover:bg-primary-light text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
              Voir tout
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <LeadsList leads={mockAvailableLeads.slice(0, 2)} />
        </Card>

        {/* Leads achetés */}
        <Card className="p-8 glass-panel">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Mes Leads Achetés
            </h2>
            <Button 
              variant="default"
              onClick={() => setShowAllPurchasedLeads(true)}
              className="gap-2 bg-primary hover:bg-primary-light text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
              Voir tout
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <PurchasedLeads leads={mockPurchasedLeads.slice(0, 2)} />
        </Card>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="projects">Projets</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="subscription">Abonnement</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

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

        <TabsContent value="subscription">
          <Card className="p-6">
            <SubscriptionPlans />
          </Card>
        </TabsContent>

        <TabsContent value="faq">
          <Card className="p-6">
            <ClientFAQ />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};