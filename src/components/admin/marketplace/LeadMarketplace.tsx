import { AdminBreadcrumb } from "../AdminBreadcrumb";
import { LeadCard } from "./LeadCard";
import { mockLeads } from "@/types/crm";

export const LeadMarketplace = () => {
  const availableLeads = mockLeads.filter(lead => lead.status === "qualified");

  return (
    <div className="space-y-6">
      <AdminBreadcrumb />
      <div className="bg-background/50 backdrop-blur-md p-6 rounded-xl border border-primary/20">
        <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-[#1EAEDB] to-[#33C3F0] bg-clip-text text-transparent">
          Marketplace des Leads
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableLeads.map(lead => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      </div>
    </div>
  );
};