import { useState } from "react";
import { Home, FileText, MessageSquare, Settings, Shield, MapPin, Phone, Mail } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientNavbar } from "@/components/client/ClientNavbar";
import { ProjectStatus } from "@/components/client/dashboard/ProjectStatus";
import { InstallerRequests } from "@/components/client/dashboard/InstallerRequests";
import { DocumentsList } from "@/components/client/documents/DocumentsList";
import { MessagesList } from "@/components/client/messages/MessagesList";
import { ClientInfoForm } from "@/components/client/dashboard/ClientInfoForm";
import { ConsumptionChart } from "@/components/client/dashboard/ConsumptionChart";
import { SavingsEstimate } from "@/components/client/dashboard/SavingsEstimate";
import { NextSteps } from "@/components/client/dashboard/NextSteps";
import { Card } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";

const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userInfo] = useState({
    name: "Jean Dupont",
    email: "j********@example.com",
    phone: "06 ** ** ** 89",
    projectStatus: "En cours d'étude",
    lastUpdate: "2024-03-20",
    installerRequests: [
      {
        id: 1,
        companyName: "Solar Pro",
        date: "2024-03-22",
        status: "pending"
      }
    ]
  });

  const getBreadcrumbText = () => {
    switch (activeTab) {
      case "dashboard":
        return "Tableau de bord";
      case "documents":
        return "Documents";
      case "messages":
        return "Messages";
      case "settings":
        return "Paramètres";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background-dark to-background-light">
      <ClientNavbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/client">Espace Client</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <span className="text-gray-400">{getBreadcrumbText()}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8 glass-panel p-6">
          <h1 className="text-3xl font-bold gradient-text">Tableau de bord</h1>
          <p className="text-gray-300 mt-2">Bienvenue, {userInfo.name}</p>
        </div>

        {/* Contact Information Card */}
        <Card className="glass-panel p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Nos coordonnées</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin className="w-5 h-5 text-primary" />
              <span>123 Avenue du Soleil, 75001 Paris</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Phone className="w-5 h-5 text-primary" />
              <a href="tel:0977774164" className="hover:text-primary transition-colors">09 77 77 41 64</a>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="w-5 h-5 text-primary" />
              <a href="mailto:mikael@wattplus.org" className="hover:text-primary transition-colors">mikael@wattplus.org</a>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="glass-panel p-1">
            <TabsTrigger value="dashboard" onClick={() => setActiveTab("dashboard")} className="gap-2">
              <Home className="w-4 h-4" />
              Accueil
            </TabsTrigger>
            <TabsTrigger value="documents" onClick={() => setActiveTab("documents")} className="gap-2">
              <FileText className="w-4 h-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="messages" onClick={() => setActiveTab("messages")} className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="settings" onClick={() => setActiveTab("settings")} className="gap-2">
              <Settings className="w-4 h-4" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <ProjectStatus 
                status={userInfo.projectStatus}
                lastUpdate={userInfo.lastUpdate}
              />
              <SavingsEstimate />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <ConsumptionChart />
              <NextSteps />
            </div>

            <ClientInfoForm />
            
            <InstallerRequests
              requests={userInfo.installerRequests}
              onAccept={(id) => console.log('Accept request:', id)}
              onReject={(id) => console.log('Reject request:', id)}
            />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsList />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesList />
          </TabsContent>

          <TabsContent value="settings">
            <Card className="glass-panel">
              <div className="p-6 space-y-6">
                <h3 className="text-xl font-semibold gradient-text">Paramètres du compte</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Nom</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md bg-background-dark/50 border-gray-600 text-gray-200"
                      value={userInfo.name}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Email</label>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-md bg-background-dark/50 border-gray-600 text-gray-200"
                      value={userInfo.email}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ClientPortal;