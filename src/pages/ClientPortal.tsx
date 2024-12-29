import { useState } from "react";
import { Home, FileText, MessageSquare, Settings, Users, Sun, Calendar, ChevronRight, Menu } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientNavbar } from "@/components/client/ClientNavbar";
import { DocumentsList } from "@/components/client/documents/DocumentsList";
import { MessagesList } from "@/components/client/messages/MessagesList";
import { ClientInfoForm } from "@/components/client/dashboard/ClientInfoForm";
import { NextSteps } from "@/components/client/dashboard/NextSteps";
import { ContactsList } from "@/components/client/dashboard/contacts/ContactsList";
import { ClientFAQ } from "@/components/client/faq/ClientFAQ";
import { InstallerDirectory } from "@/components/client/directory/InstallerDirectory";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DashboardStats } from "@/components/client/dashboard/DashboardStats";
import { SettingsSection } from "@/components/client/settings/SettingsSection";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";

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

  const isMobile = useMediaQuery("(max-width: 768px)");

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

  const navigationLinks = [
    { icon: Home, label: "Accueil", tab: "dashboard" },
    { icon: FileText, label: "Documents", tab: "documents" },
    { icon: MessageSquare, label: "Messages", tab: "messages" },
    { icon: Users, label: "Annuaire", tab: "directory" },
    { icon: Settings, label: "Paramètres", tab: "settings" },
  ];

  const NavigationContent = () => (
    <div className="flex flex-col space-y-2">
      {navigationLinks.map((link) => (
        <Button
          key={link.tab}
          variant={activeTab === link.tab ? "default" : "ghost"}
          size="sm"
          onClick={() => {
            setActiveTab(link.tab);
          }}
          className="w-full justify-start gap-2"
        >
          <link.icon className="w-4 h-4" />
          {link.label}
        </Button>
      ))}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Espace Client - {getBreadcrumbText()}</title>
        <meta
          name="description"
          content="Accédez à votre espace client pour suivre l'avancement de votre projet d'installation solaire, consulter vos documents et communiquer avec votre installateur."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background/80 to-background">
        <ClientNavbar />
        
        <main className="container mx-auto px-4 py-4 md:py-8">
          <div className="mb-4 md:mb-8 space-y-4 md:space-y-6">
            <div className="flex flex-col space-y-4">
              {!isMobile && (
                <Breadcrumb>
                  <BreadcrumbList className="bg-background/50 backdrop-blur-md px-4 py-2 rounded-lg border border-border">
                    <BreadcrumbItem>
                      <BreadcrumbLink onClick={() => setActiveTab("dashboard")} className="text-muted-foreground hover:text-foreground transition-colors">
                        Espace Client
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <span className="font-medium">{getBreadcrumbText()}</span>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sun className="h-6 w-6 md:h-8 md:w-8 text-yellow-500" />
                  <div>
                    <h1 className="text-xl md:text-3xl font-bold">{getBreadcrumbText()}</h1>
                    <p className="text-sm md:text-base text-muted-foreground flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4" />
                      {isMobile ? userInfo.name : `Bienvenue, ${userInfo.name} | Dernière connexion : ${new Date().toLocaleDateString('fr-FR')}`}
                    </p>
                  </div>
                </div>

                {isMobile ? (
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[240px]">
                      <div className="py-4">
                        <NavigationContent />
                      </div>
                    </SheetContent>
                  </Sheet>
                ) : (
                  <div className="flex items-center gap-4">
                    <NavigationContent />
                  </div>
                )}
              </div>
            </div>
          </div>

          <Tabs value={activeTab} className="space-y-4 md:space-y-6">
            <TabsContent value="dashboard">
              <div className="grid gap-4 md:gap-6">
                <DashboardStats />
                <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
                  <div className="space-y-4 md:space-y-6">
                    <ClientInfoForm onMonthlyBillUpdate={handleMonthlyBillUpdate} />
                  </div>
                  <div className="space-y-4 md:space-y-6">
                    <ContactsList contacts={mockContacts} />
                  </div>
                </div>
                <div className="grid gap-4 md:gap-6">
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