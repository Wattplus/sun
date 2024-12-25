import { Users, FileText, Target, Activity, TrendingUp, ArrowUpRight, LineChart } from "lucide-react";
import StatCard from "./StatCard";
import PerformanceChart from "./PerformanceChart";
import RecentActivity from "./RecentActivity";
import LeadManagement from "./LeadManagement";
import InstallerManagement from "./InstallerManagement";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Panneau d'administration
        </h1>
        
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

        <div className="space-y-6">
          <LeadManagement />
          <InstallerManagement />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;