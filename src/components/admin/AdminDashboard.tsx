import { Users, FileText, Target, Activity, TrendingUp, ArrowUpRight, LineChart } from "lucide-react";
import StatCard from "./StatCard";
import PerformanceChart from "./PerformanceChart";
import RecentActivity from "./RecentActivity";
import { AdminNavigation } from "./AdminNavigation";
import { AdminBreadcrumb } from "./AdminBreadcrumb";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-4">
          <h1 className="text-xl font-bold mb-6 px-4">Administration</h1>
          <AdminNavigation />
        </div>
        
        <div className="flex-1 p-8">
          <AdminBreadcrumb />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Visiteurs"
              value="2,543"
              change="+15% ce mois"
              icon={Users}
              trendIcon={TrendingUp}
              trendColor="green"
            />
            <StatCard
              title="Devis générés"
              value="384"
              change="+12% cette semaine"
              icon={FileText}
              trendIcon={ArrowUpRight}
              trendColor="green"
            />
            <StatCard
              title="Taux de conversion"
              value="15.1%"
              change="+3% ce mois"
              icon={Target}
              trendIcon={LineChart}
              trendColor="green"
            />
            <StatCard
              title="Leads qualifiés"
              value="156"
              change="+18% cette semaine"
              icon={Activity}
              trendIcon={TrendingUp}
              trendColor="green"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <PerformanceChart />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;