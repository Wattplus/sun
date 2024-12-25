import { Card } from "@/components/ui/card";
import { LeadsList } from "@/components/installer/dashboard/LeadsList";
import { mockAvailableLeads } from "@/components/installer/dashboard/mockAvailableLeads";

export const NewLeadsPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Nouveaux Leads</h1>
      </div>
      
      <Card className="p-6">
        <LeadsList 
          leads={mockAvailableLeads}
        />
      </Card>
    </div>
  );
};