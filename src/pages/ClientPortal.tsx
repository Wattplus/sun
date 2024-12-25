import { useState } from "react";
import { Home, FileText, MessageSquare, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientNavbar } from "@/components/client/ClientNavbar";
import { ProjectStatus } from "@/components/client/dashboard/ProjectStatus";
import { InstallerRequests } from "@/components/client/dashboard/InstallerRequests";
import { DocumentsList } from "@/components/client/documents/DocumentsList";
import { MessagesList } from "@/components/client/messages/MessagesList";
import { ClientInfoForm } from "@/components/client/dashboard/ClientInfoForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue, {userInfo.name}</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard" onClick={() => setActiveTab("dashboard")}>
              <Home className="w-4 h-4 mr-2" />
              Accueil
            </TabsTrigger>
            <TabsTrigger value="documents" onClick={() => setActiveTab("documents")}>
              <FileText className="w-4 h-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="messages" onClick={() => setActiveTab("messages")}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="settings" onClick={() => setActiveTab("settings")}>
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid gap-6 md:grid-cols-2">
              <ProjectStatus 
                status={userInfo.projectStatus}
                lastUpdate={userInfo.lastUpdate}
              />
              <ClientInfoForm />
              <InstallerRequests
                requests={userInfo.installerRequests}
                onAccept={(id) => console.log('Accept request:', id)}
                onReject={(id) => console.log('Reject request:', id)}
              />
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsList />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesList />
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Paramètres du compte</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={userInfo.name}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={userInfo.email}
                    readOnly
                  />
                </div>
                <Button>Modifier le mot de passe</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ClientPortal;