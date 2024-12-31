import { useEffect } from "react";
import { DashboardTabs } from "./DashboardTabs";
import { useLeadOperations } from "@/hooks/useLeadOperations";
import { supabase } from "@/lib/supabase-client";
import { Loader2 } from "lucide-react";

export function DashboardContent() {
  const { leads, fetchLeads, isLoading } = useLeadOperations();

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
    console.log("[DashboardContent] Current leads count:", leads?.length);
    console.log("[DashboardContent] Current leads data:", leads);
  }, [leads]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardTabs leads={leads || []} />
    </div>
  );
}