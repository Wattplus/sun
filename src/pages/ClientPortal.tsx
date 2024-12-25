import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientNavbar } from "@/components/client/ClientNavbar";
import { FileText, Home, MessageSquare, Settings, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState({
    name: "Jean Dupont",
    email: "j********@example.com", // Email masqué
    phone: "06 ** ** ** 89", // Téléphone masqué
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

  const handleAcceptRequest = (requestId: number) => {
    // Simuler l'acceptation de la demande
    setUserInfo(prev => ({
      ...prev,
      installerRequests: prev.installerRequests.map(req =>
        req.id === requestId ? { ...req, status: "accepted" } : req
      )
    }));
    toast({
      title: "Demande acceptée",
      description: "L'installateur pourra maintenant vous contacter directement.",
    });
  };

  const handleRejectRequest = (requestId: number) => {
    // Simuler le rejet de la demande
    setUserInfo(prev => ({
      ...prev,
      installerRequests: prev.installerRequests.filter(req => req.id !== requestId)
    }));
    toast({
      title: "Demande rejetée",
      description: "L'installateur ne pourra pas accéder à vos coordonnées.",
    });
  };

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
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">État du projet</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Statut actuel</p>
                    <p className="font-medium">{userInfo.projectStatus}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dernière mise à jour</p>
                    <p className="font-medium">{userInfo.lastUpdate}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Vos coordonnées sont protégées</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Demandes d'installateurs</h3>
                {userInfo.installerRequests.length > 0 ? (
                  <div className="space-y-4">
                    {userInfo.installerRequests.map((request) => (
                      <div key={request.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-medium">{request.companyName}</p>
                            <p className="text-sm text-gray-500">{request.date}</p>
                          </div>
                          <Badge variant={request.status === 'pending' ? 'outline' : 'success'}>
                            {request.status === 'pending' ? 'En attente' : 'Accepté'}
                          </Badge>
                        </div>
                        {request.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleAcceptRequest(request.id)}
                            >
                              Accepter
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRejectRequest(request.id)}
                            >
                              Refuser
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Aucune demande d'installateur en attente</p>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc, index) => (
                    <TableRow key={index}>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell>{doc.status}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Télécharger
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card className="p-6">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      message.read ? "bg-gray-50" : "bg-blue-50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium">{message.date}</p>
                      {!message.read && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          Nouveau
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">{message.content}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Paramètres du compte</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={userInfo.name}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={userInfo.email}
                    readOnly
                  />
                </div>
                <Button className="mt-4">Modifier le mot de passe</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ClientPortal;
