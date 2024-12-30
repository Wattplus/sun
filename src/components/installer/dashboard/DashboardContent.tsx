import { useEffect } from "react";
import { DashboardTabs } from "./DashboardTabs";
import { useLeadOperations } from "@/hooks/useLeadOperations";
import { supabase } from "@/lib/supabase-client";

export function DashboardContent() {
  const { leads, fetchLeads } = useLeadOperations();

  useEffect(() => {
    console.log("[DashboardContent] Initializing and fetching leads");
    fetchLeads();

    // Set up real-time subscription for leads table changes
    const channel = supabase
      .channel('public:leads')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'leads'
        },
        (payload) => {
          console.log('[DashboardContent] Real-time update received:', payload);
          fetchLeads(); // Refresh leads when changes occur
        }
      )
      .subscribe();

    // Clean up subscription on unmount
    return () => {
      console.log("[DashboardContent] Cleaning up real-time subscription");
      supabase.removeChannel(channel);
    };
  }, [fetchLeads]);

  // Log the current number of leads for debugging
  useEffect(() => {
    console.log("[DashboardContent] Current leads count:", leads.length);
  }, [leads]);

  return (
    <div className="space-y-8">
      <DashboardTabs leads={leads} />
    </div>
  );
}