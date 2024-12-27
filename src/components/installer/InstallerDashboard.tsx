import { InstallerLayout } from "./navigation/InstallerLayout";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardTabs } from "./dashboard/DashboardTabs";
import { StatsCards } from "./dashboard/StatsCards";

export function InstallerDashboard() {
  return (
    <InstallerLayout>
      <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
        <div className="max-w-[1600px] mx-auto space-y-8">
          <DashboardHeader />
          <StatsCards />
          <DashboardTabs />
        </div>
      </div>
    </InstallerLayout>
  );
}