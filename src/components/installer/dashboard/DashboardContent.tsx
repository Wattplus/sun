import { useEffect } from "react";
import { DashboardTabs } from "./DashboardTabs";
import { useLeadOperations } from "@/hooks/useLeadOperations";
import { supabase } from "@/lib/supabase-client";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function DashboardContent() {
  const { leads, fetchLeads, isLoading, error } = useLeadOperations();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("[DashboardContent] Initializing and fetching leads");
    fetchLeads();

    // Set up real-time subscription for leads table changes
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
          fetchLeads();
        }
      )
      .subscribe();

    return () => {
      console.log("[DashboardContent] Cleaning up real-time subscription");
      supabase.removeChannel(channel);
    };
  }, [fetchLeads]);

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription className="mt-2 space-y-4">
            {error}
            <Button 
              onClick={() => navigate("/espace-installateur/profil")}
              className="mt-4 w-full sm:w-auto"
            >
              Compléter mon profil
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

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