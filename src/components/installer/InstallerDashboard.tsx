import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardTabs } from "./dashboard/DashboardTabs";
import { InstallerBreadcrumb } from "./navigation/InstallerBreadcrumb";

export function InstallerDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-6">
      <InstallerBreadcrumb />
      <DashboardHeader />
      <DashboardTabs />
    </div>
  );
}