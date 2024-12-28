import { InstallerLayout } from "./navigation/InstallerLayout";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardTabs } from "./dashboard/DashboardTabs";

export function InstallerDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background">
      <InstallerLayout>
        <div className="p-6 space-y-8">
          <div className="max-w-[1600px] mx-auto space-y-8">
            <DashboardHeader />
            <DashboardTabs />
          </div>
        </div>
      </InstallerLayout>
    </div>
  );
}