import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrepaidBalance } from "./PrepaidBalance";
import { StatsCards } from "./StatsCards";
import { ProjectsList } from "./ProjectsList";
import { MessagesList } from "./MessagesList";
import { InstallerProfile } from "@/pages/InstallerProfile";
import { Card } from "@/components/ui/card";
import { mockAvailableLeads } from "./mockAvailableLeads";
import { mockPurchasedLeads } from "./mockPurchasedLeads";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { SubscriptionPlans } from "../subscription/SubscriptionPlans";
import { ClientFAQ } from "@/components/client/faq/ClientFAQ";
import { DashboardControls } from "./header/DashboardControls";
import { LeadsOverview } from "./leads/LeadsOverview";
import { AllPurchasedLeads } from "./leads/AllPurchasedLeads";
import { AllAvailableLeads } from "./leads/AllAvailableLeads";

export const DashboardTabs = () => {
  const [showAllPurchasedLeads, setShowAllPurchasedLeads] = useState(false);
  const [showAllAvailableLeads, setShowAllAvailableLeads] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Erreur lors du changement de mode plein écran:", err);
    }
  };

  if (showAllPurchasedLeads) {
    return (
      <AllPurchasedLeads
        leads={mockPurchasedLeads}
        onClose={() => setShowAllPurchasedLeads(false)}
      />
    );
  }

  if (showAllAvailableLeads) {
    return (
      <AllAvailableLeads
        leads={mockAvailableLeads}
        onClose={() => setShowAllAvailableLeads(false)}
      />
    );
  }

  return (
    <div className="space-y-8">
      <DashboardControls
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />

      <div className="grid gap-6">
        <StatsCards />
      </div>

      <PrepaidBalance balance={150} />
      
      <Button
        size="lg"
        onClick={() => setShowAllAvailableLeads(true)}
        className="w-full py-8 text-lg font-semibold bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white shadow-lg transition-all duration-300 hover:scale-[1.02] group"
      >
        <span className="flex items-center justify-center gap-3">
          Voir tous les leads disponibles
          <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
        </span>
      </Button>
      
      <LeadsOverview
        availableLeads={mockAvailableLeads}
        purchasedLeads={mockPurchasedLeads}
        onShowAllAvailable={() => setShowAllAvailableLeads(true)}
        onShowAllPurchased={() => setShowAllPurchasedLeads(true)}
      />

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