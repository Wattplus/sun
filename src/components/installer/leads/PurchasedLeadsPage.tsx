import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { PurchasedLeads } from "../dashboard/PurchasedLeads";

export function PurchasedLeadsPage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <InstallerBreadcrumb />
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Leads achetés</h1>
        <PurchasedLeads />
      </div>
    </div>
  );
}