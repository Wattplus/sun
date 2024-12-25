import { Bell, Calendar, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCards } from "./dashboard/StatsCards";
import { LeadsList } from "./dashboard/LeadsList";
import { MessagesList } from "./dashboard/MessagesList";
import { NotificationsList } from "./dashboard/NotificationsList";
import { PrepaidBalance } from "./dashboard/PrepaidBalance";
import { mockLeads } from "@/types/crm";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function InstallerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-4 space-y-4">
      {/* En-tête simplifié */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold gradient-text">
          Espace Installateur
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" className="glass-button">
            <Bell className="h-4 w-4" />
            <Badge variant="secondary" className="ml-1">2</Badge>
          </Button>
          <Button variant="outline" className="glass-button">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid gap-4">
            <PrepaidBalance balance={0} />
            <StatsCards />
          </div>
        </TabsContent>

        <TabsContent value="leads">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Mes Leads</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
                <Button variant="outline" size="sm">
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
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Télécharger mes documents
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Notifications en bas */}
      <Card className="p-4">
        <NotificationsList />
      </Card>
    </div>
  );
}