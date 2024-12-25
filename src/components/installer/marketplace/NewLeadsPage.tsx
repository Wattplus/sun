import { LeadsList } from "../dashboard/LeadsList";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";

export function NewLeadsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <InstallerBreadcrumb />
      <div className="max-w-[1600px] mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Nouveaux Leads Disponibles
          </h1>
        </div>
        
        <div className="glass-panel p-6">
          <LeadsList leads={mockAvailableLeads} />
        </div>
      </div>
    </div>
  );
}