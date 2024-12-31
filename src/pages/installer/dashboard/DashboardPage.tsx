import { LeadsOverview } from "@/components/installer/dashboard/leads/LeadsOverview";
import { StatsCards } from "@/components/installer/dashboard/leads/StatsCards";
import { useLeadOperations } from "@/hooks/useLeadOperations";

export const DashboardPage = () => {
  const { leads } = useLeadOperations();

  // Calculate stats
  const stats = {
    total: leads.length,
    contacted: leads.filter(lead => lead.installerStatus === 'contacte').length,
    converted: leads.filter(lead => lead.installerStatus === 'signe').length,
    lost: leads.filter(lead => lead.installerStatus === 'perdu').length,
    totalInvestment: leads.reduce((acc, lead) => acc + (lead.price || 0), 0),
    averagePrice: leads.length > 0 
      ? leads.reduce((acc, lead) => acc + (lead.price || 0), 0) / leads.length 
      : 0,
  };

  return (
    <div className="space-y-8 p-8">
      <StatsCards stats={stats} />
      <LeadsOverview />
    </div>
  );
};