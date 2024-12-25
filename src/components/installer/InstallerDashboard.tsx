import { Bell, Calendar, Download, Filter, Phone, Mail, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { mockLeads } from "@/types/crm";

// Composants
import { StatsCards } from "./dashboard/StatsCards";
import { LeadsList } from "./dashboard/LeadsList";
import { MessagesList } from "./dashboard/MessagesList";
import { NotificationsList } from "./dashboard/NotificationsList";
import { PrepaidBalance } from "./dashboard/PrepaidBalance";

export function InstallerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: "Action effectuée",
      description: `${action} en cours de développement`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-4 space-y-4">
      {/* En-tête simplifié */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Tableau de bord
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleAction("Notifications")}>
            <Bell className="h-4 w-4" />
            <Badge variant="secondary">2</Badge>
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleAction("Calendrier")}>
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation principale */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="dashboard">Accueil</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Contenu des onglets */}
        <TabsContent value="dashboard">
          <div className="grid gap-4">
            <PrepaidBalance balance={0} />
            <StatsCards />
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Actions rapides</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => handleAction("Nouveau lead")}>
                  <ChevronRight className="h-4 w-4" />
                  Voir les nouveaux leads
                </Button>
                <Button variant="outline" onClick={() => handleAction("Messages")}>
                  <Mail className="h-4 w-4" />
                  Messages non lus
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leads">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Mes Leads</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleAction("Filtrer")}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAction("Exporter")}>
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </div>
            <LeadsList leads={mockLeads} />
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card className="p-4">
            <MessagesList />
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="p-4">
            <div className="text-center py-8">
              <h3 className="text-lg font-medium mb-2">Documents & Ressources</h3>
              <p className="text-muted-foreground mb-4">
                Accédez à vos documents, factures et ressources
              </p>
              <Button onClick={() => handleAction("Télécharger")}>
                <Download className="h-4 w-4 mr-2" />
                Télécharger mes documents
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Notifications */}
      <Card className="p-4">
        <NotificationsList />
      </Card>
    </div>
  );
}