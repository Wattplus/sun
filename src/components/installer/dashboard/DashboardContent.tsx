import { KPISection } from "./sections/KPISection";
import { PerformanceCharts } from "./sections/PerformanceCharts";
import { RecentActivity } from "./sections/RecentActivity";
import { LeadsTable } from "./sections/LeadsTable";

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <KPISection />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceCharts />
        <RecentActivity />
      </div>
      <LeadsTable />
    </div>
  );
}