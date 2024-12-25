import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardTabs } from "./dashboard/DashboardTabs";
import { InstallerBreadcrumb } from "./navigation/InstallerBreadcrumb";
import { LeadsList } from "./dashboard/LeadsList";
import { PurchasedLeads } from "./dashboard/PurchasedLeads";

export function InstallerDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <InstallerBreadcrumb />
      <div className="max-w-[1600px] mx-auto">
        <DashboardHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[#1EAEDB]">Nouveaux Leads Disponibles</h2>
              <button className="text-[#1EAEDB] hover:text-[#1EAEDB]/80 transition-colors">
                Voir tout
              </button>
            </div>
            <LeadsList leads={[]} />
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[#1EAEDB]">Mes Leads Achetés</h2>
              <button className="text-[#1EAEDB] hover:text-[#1EAEDB]/80 transition-colors">
                Voir tout
              </button>
            </div>
            <PurchasedLeads />
          </div>
        </div>
      </div>
    </div>
  );
}