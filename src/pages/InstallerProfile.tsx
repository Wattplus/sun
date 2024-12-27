import { useLocation } from "react-router-dom";
import { InstallerDashboard } from "@/components/installer/InstallerDashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { InstallerSidebar } from "@/components/installer/navigation/InstallerSidebar";
import { ProjectsPage } from "@/components/installer/projects/ProjectsPage";
import { MessagesPage } from "@/components/installer/messages/MessagesPage";
import { ClientsPage } from "@/components/installer/clients/ClientsPage";
import { SettingsPage } from "@/components/installer/settings/SettingsPage";
import { HelpPage } from "@/components/installer/help/HelpPage";
import { PurchasedLeadsPage } from "@/components/installer/leads/PurchasedLeadsPage";
import { LeadDetailsPage } from "@/components/installer/leads/LeadDetailsPage";

const InstallerProfile = () => {
  const location = useLocation();
  const path = location.pathname;

  const renderContent = () => {
    // Exact match for leads page
    if (path === "/espace-installateur/leads") {
      return <PurchasedLeadsPage />;
    }

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
      case "/espace-installateur":
        return <InstallerDashboard />;
      default:
        if (path.startsWith("/espace-installateur/leads/")) {
          return <LeadDetailsPage />;
        }
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