import { useEffect } from "react";
import { DashboardTabs } from "./DashboardTabs";
import { useLeadOperations } from "@/hooks/useLeadOperations";

export function DashboardContent() {
  const { leads, fetchLeads } = useLeadOperations();

  useEffect(() => {
    console.log("[DashboardContent] Initializing and fetching leads");
    fetchLeads();

    // Set up real-time subscription for new leads
    const channel = supabase
      .channel('public:leads')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads'
        },
        (payload) => {
          console.log('[DashboardContent] Real-time update received:', payload);
          fetchLeads(); // Refresh leads when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchLeads]);

  return (
    <div className="space-y-8">
      <DashboardTabs />
    </div>
  );
}