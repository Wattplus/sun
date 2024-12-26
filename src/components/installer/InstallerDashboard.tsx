import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardTabs } from "./dashboard/DashboardTabs";
import { InstallerBreadcrumb } from "./navigation/InstallerBreadcrumb";
import { LeadsList } from "./dashboard/LeadsList";
import { PurchasedLeads } from "./dashboard/PurchasedLeads";
import { Link } from "react-router-dom";
import { mockAvailableLeads } from "./dashboard/mockAvailableLeads";
import { StatsCards } from "./dashboard/StatsCards";

export function InstallerDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <InstallerBreadcrumb />
      <div className="max-w-[1600px] mx-auto space-y-8">
        <DashboardHeader />
        <StatsCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Nouveaux Leads */}
          <div className="glass-panel p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Nouveaux Leads Disponibles
              </h2>
              <Link 
                to="/espace-installateur/marketplace/nouveaux-leads"
                className="glass-button text-sm hover:bg-primary/10 transition-colors"
              >
                Voir tout
              </Link>
            </div>
            <LeadsList leads={mockAvailableLeads.slice(0, 2)} />
          </div>
          
          {/* Leads Achetés */}
          <div className="glass-panel p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Mes Leads Achetés
              </h2>
              <Link 
                to="/espace-installateur/marketplace/leads-achetes"
                className="glass-button text-sm hover:bg-primary/10 transition-colors"
              >
                Voir tout
              </Link>
            </div>
            <PurchasedLeads />
          </div>
        </div>

        <DashboardTabs />
      </div>
    </div>
  );
}