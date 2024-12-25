import { Bell, Calendar, Download, Filter, Phone, Mail, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { mockLeads } from "@/types/crm";
import { useNavigate } from "react-router-dom";

import { StatsCards } from "./dashboard/StatsCards";
import { LeadsList } from "./dashboard/LeadsList";
import { MessagesList } from "./dashboard/MessagesList";
import { NotificationsList } from "./dashboard/NotificationsList";
import { PrepaidBalance } from "./dashboard/PrepaidBalance";
import { PurchasedLeads } from "./dashboard/PurchasedLeads";
import { InstallerProfile } from "@/pages/InstallerProfile";

export function InstallerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    switch (action) {
      case "nouveaux-leads":
        setActiveTab("leads");
        toast({
          title: "Navigation",
          description: "Affichage des nouveaux leads",
        });
        break;
      case "messages":
        setActiveTab("messages");
        toast({
          title: "Navigation",
          description: "Affichage des messages non lus",
        });
        break;
      default:
        toast({
          title: "Action effectuée",
          description: `${action} en cours de développement`,
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Tableau de bord
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleAction("notifications")}>
            <Bell className="h-4 w-4" />
            <Badge variant="secondary">2</Badge>
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleAction("calendrier")}>
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsTrigger value="dashboard">Accueil</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="purchased">Leads Achetés</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="profile">Profil</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid gap-4">
            <PrepaidBalance balance={0} />
            <StatsCards />
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Actions rapides</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => handleAction("nouveaux-leads")}
                  className="flex items-center justify-center gap-2 hover:bg-primary/10"
                >
                  <ChevronRight className="h-4 w-4" />
                  Voir les nouveaux leads
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleAction("messages")}
                  className="flex items-center justify-center gap-2 hover:bg-primary/10"
                >
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
                <Button variant="outline" size="sm" onClick={() => handleAction("filtrer")}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAction("exporter")}>
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </div>
            <LeadsList leads={mockLeads} />
          </Card>
        </TabsContent>

        <TabsContent value="purchased">
          <PurchasedLeads leads={mockLeads.filter(lead => lead.status === "assigned")} />
        </TabsContent>

        <TabsContent value="messages">
          <Card className="p-4">
            <MessagesList />
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <InstallerProfile />
        </TabsContent>
      </Tabs>

      <Card className="p-4">
        <NotificationsList />
      </Card>
    </div>
  );
}