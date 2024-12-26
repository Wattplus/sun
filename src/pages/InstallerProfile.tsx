import { Outlet, useLocation } from "react-router-dom";
import { InstallerDashboard } from "@/components/installer/InstallerDashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { InstallerSidebar } from "@/components/installer/navigation/InstallerSidebar";

const InstallerProfile = () => {
  const location = useLocation();
  const isMarketplace = location.pathname.includes('/marketplace');

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full">
        <InstallerSidebar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
          {!isMarketplace && <InstallerDashboard />}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default InstallerProfile;