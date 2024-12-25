import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { FileText, Home, MessageSquare, Settings } from "lucide-react";

const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userInfo, setUserInfo] = useState({
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    projectStatus: "En cours d'étude",
    lastUpdate: "2024-03-20",
  });

  const documents = [
    { name: "Étude personnalisée", date: "2024-03-20", status: "Disponible" },
    { name: "Devis", date: "2024-03-20", status: "En attente" },
    { name: "Plan d'installation", date: "2024-03-21", status: "En cours" },
  ];

  const messages = [
    {
      date: "2024-03-20",
      content: "Votre étude personnalisée est maintenant disponible.",
      read: true,
    },
    {
      date: "2024-03-21",
      content: "Un conseiller a été assigné à votre projet.",
      read: false,
    },
  ];

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
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Prochaines étapes</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-green-600">
                    <span className="mr-2">✓</span>
                    Soumission de la demande
                  </li>
                  <li className="flex items-center text-blue-600">
                    <span className="mr-2">→</span>
                    Étude personnalisée
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="mr-2">○</span>
                    Visite technique
                  </li>
                </ul>
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