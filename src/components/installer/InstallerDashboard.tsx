import { Bell, Calendar, Download, Filter, Phone, Mail, ChevronRight, Wallet, Users, LineChart, ShoppingBag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
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
import ProjectsList from "./dashboard/ProjectsList";
import { InstallerProfile } from "@/pages/InstallerProfile";
import { SubscriptionPlans } from "./subscription/SubscriptionPlans";

export function InstallerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
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

  const quickStats = [
    {
      title: "Solde disponible",
      value: "150 €",
      icon: <Wallet className="h-4 w-4 text-primary" />,
      change: "+12% ce mois",
      color: "bg-blue-500/10",
    },
    {
      title: "Leads achetés",
      value: "24",
      icon: <ShoppingBag className="h-4 w-4 text-green-500" />,
      change: "+4 cette semaine",
      color: "bg-green-500/10",
    },
    {
      title: "Taux de conversion",
      value: "68%",
      icon: <LineChart className="h-4 w-4 text-blue-500" />,
      change: "+2.4% ce mois",
      color: "bg-blue-500/10",
    },
    {
      title: "Leads actifs",
      value: "12",
      icon: <Users className="h-4 w-4 text-purple-500" />,
      change: "3 nouveaux aujourd'hui",
      color: "bg-purple-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Tableau de bord
          </h1>
          <p className="text-muted-foreground mt-1">
            Bienvenue dans votre espace installateur
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={() => handleAction("notifications")} className="relative">
            <Bell className="h-4 w-4" />
            <Badge variant="secondary" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">2</Badge>
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleAction("calendrier")}>
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className={`p-4 hover:shadow-lg transition-all duration-200 cursor-pointer ${stat.color}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </div>
              <div className="p-2 bg-background/10 rounded-full">
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold">Mes Leads</h2>
                <p className="text-sm text-muted-foreground">
                  Gérez et suivez vos leads en temps réel
                </p>
              </div>
              <div className="flex gap-3">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un lead..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
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
            <LeadsList leads={mockLeads.filter(lead => 
              lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              lead.city.toLowerCase().includes(searchTerm.toLowerCase())
            )} />
          </Card>
        </TabsContent>

        <TabsContent value="purchased">
          <PurchasedLeads leads={mockLeads.filter(lead => lead.status === "assigned")} />
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

      <Card className="p-6 mt-6">
        <h3 className="text-xl font-semibold mb-4">Dernières notifications</h3>
        <NotificationsList />
      </Card>
    </div>
  );
}