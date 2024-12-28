import { useState } from "react";
import { Home, FileText, MessageSquare, Settings, Users, Sun, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientNavbar } from "@/components/client/ClientNavbar";
import { DocumentsList } from "@/components/client/documents/DocumentsList";
import { MessagesList } from "@/components/client/messages/MessagesList";
import { ClientInfoForm } from "@/components/client/dashboard/ClientInfoForm";
import { ConsumptionChart } from "@/components/client/dashboard/ConsumptionChart";
import { NextSteps } from "@/components/client/dashboard/NextSteps";
import { ContactsList } from "@/components/client/dashboard/contacts/ContactsList";
import { ClientFAQ } from "@/components/client/faq/ClientFAQ";
import { InstallerDirectory } from "@/components/client/directory/InstallerDirectory";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { DashboardStats } from "@/components/client/dashboard/DashboardStats";
import { SettingsSection } from "@/components/client/settings/SettingsSection";

const mockContacts = [
  {
    id: "1",
    companyName: "Solar Expert",
    contactName: "Marie Martin",
    email: "contact@solarexpert.fr",
    phone: "01 23 45 67 89",
    purchaseType: "exclusif" as const,
    purchaseDate: "2024-03-25"
  },
  {
    id: "2",
    companyName: "Éco Énergie",
    contactName: "Pierre Dubois",
    email: "info@ecoenergie.fr",
    phone: "01 98 76 54 32",
    purchaseType: "mutualisé" as const,
    purchaseDate: "2024-03-24"
  }
];

const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [monthlyBill, setMonthlyBill] = useState<string>("");
  const [userInfo] = useState({
    name: "Jean Dupont",
    email: "j********@example.com",
    phone: "06 ** ** ** 89",
    projectStatus: "En cours d'étude",
    lastUpdate: "2024-03-20"
  });

  const handleMonthlyBillUpdate = (value: string) => {
    setMonthlyBill(value);
  };

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
      case "directory":
        return "Annuaire";
      default:
        return "";
    }
  };

  return (
    <>
      <Helmet>
        <title>Espace Client - Suivi de Projet Photovoltaïque</title>
        <meta
          name="description"
          content="Accédez à votre espace client pour suivre l'avancement de votre projet d'installation solaire, consulter vos documents et communiquer avec votre installateur."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background/80 to-background">
        <ClientNavbar />
        
        <main className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/client">Espace Client</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <span className="text-muted-foreground">{getBreadcrumbText()}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Sun className="h-8 w-8 text-yellow-500" />
              <h1 className="text-3xl font-bold">Tableau de bord</h1>
            </div>
            <p className="text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Bienvenue, {userInfo.name} | Dernière connexion : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </motion.div>

          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto">
              <TabsTrigger value="dashboard" onClick={() => setActiveTab("dashboard")} className="gap-2">
                <Home className="w-4 h-4" />
                Accueil
              </TabsTrigger>
              <TabsTrigger value="directory" onClick={() => setActiveTab("directory")} className="gap-2">
                <Users className="w-4 h-4" />
                Annuaire
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

            <TabsContent value="dashboard">
              <div className="grid gap-6">
                <DashboardStats />

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-6">
                    <ClientInfoForm onMonthlyBillUpdate={handleMonthlyBillUpdate} />
                  </div>
                  <div className="space-y-6">
                    <ContactsList contacts={mockContacts} />
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <ConsumptionChart />
                  <NextSteps />
                </div>

                <ClientFAQ />
              </div>
            </TabsContent>

            <TabsContent value="directory">
              <InstallerDirectory />
            </TabsContent>

            <TabsContent value="documents">
              <DocumentsList />
            </TabsContent>

            <TabsContent value="messages">
              <MessagesList />
            </TabsContent>

            <TabsContent value="settings">
              <SettingsSection userInfo={userInfo} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
};

export default ClientPortal;
