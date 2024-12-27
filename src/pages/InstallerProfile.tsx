import { Outlet, useLocation } from "react-router-dom";
import { InstallerDashboard } from "@/components/installer/InstallerDashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { InstallerSidebar } from "@/components/installer/navigation/InstallerSidebar";
import { ProjectsPage } from "@/components/installer/projects/ProjectsPage";
import { MessagesPage } from "@/components/installer/messages/MessagesPage";
import { ClientsPage } from "@/components/installer/clients/ClientsPage";
import { SettingsPage } from "@/components/installer/settings/SettingsPage";
import { HelpPage } from "@/components/installer/help/HelpPage";
import { PurchasedLeadsPage } from "@/components/installer/leads/PurchasedLeadsPage";
import { SubscriptionPlans } from "@/components/installer/subscription/SubscriptionPlans";

const InstallerProfile = () => {
  const location = useLocation();
  const path = location.pathname;

  const renderContent = () => {
    switch (path) {
      case "/espace-installateur/projets":
        return <ProjectsPage />;
      case "/espace-installateur/messages":
        return <MessagesPage />;
      case "/espace-installateur/clients":
        return <ClientsPage />;
      case "/espace-installateur/parametres":
        return <SettingsPage />;
      case "/espace-installateur/aide":
        return <HelpPage />;
      case "/espace-installateur/leads":
        return <PurchasedLeadsPage />;
      case "/espace-installateur/abonnement":
        return (
          <div className="p-6">
            <SubscriptionPlans />
          </div>
        );
      default:
        return <InstallerDashboard />;
    }
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full">
        <InstallerSidebar />
        <main className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default InstallerProfile;