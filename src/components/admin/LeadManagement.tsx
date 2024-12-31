import { useState, useEffect } from "react";
import { LeadTable } from "./leads/LeadTable";
import { LeadMobileTable } from "./leads/LeadMobileTable";
import { LeadHeader } from "./leads/LeadHeader";
import { LeadStats } from "./leads/LeadStats";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { useLeadOperations } from "@/hooks/useLeadOperations";
import { getStatusColor, getStatusText } from "@/utils/leadStatus";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useLeadDialogManager } from "./leads/LeadDialogManager";

export const LeadManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const { leads, fetchLeads } = useLeadOperations();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { handleDeleteClick, handleEditClick, handleAssignClick, renderDialogs } = useLeadDialogManager();

  useEffect(() => {
    const checkAuthAndFetchLeads = async () => {
      try {
        console.log("LeadManagement: Vérification de l'authentification...");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("LeadManagement: Erreur de session:", sessionError);
          toast({
            title: "Erreur d'authentification",
            description: "Impossible de vérifier votre session: " + sessionError.message,
            variant: "destructive",
          });
          navigate("/login");
          return;
        }

        if (!session) {
          console.error("LeadManagement: Pas de session active");
          toast({
            title: "Non authentifié",
            description: "Vous devez être connecté pour accéder à cette page",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }

        console.log("LeadManagement: Session active, utilisateur:", session.user.id);
        console.log("LeadManagement: Récupération des leads...");
        await fetchLeads();
      } catch (error) {
        console.error("LeadManagement: Erreur inattendue:", error);
        toast({
          title: "Erreur",
          description: "Une erreur inattendue est survenue",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndFetchLeads();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("LeadManagement: Auth state changed:", event, session?.user?.id);
      if (event === 'SIGNED_OUT') {
        navigate("/login");
      } else if (event === 'SIGNED_IN' && !leads.length) {
        fetchLeads();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background/95 to-background/50 py-8">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">Chargement des leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/95 to-background/50 py-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <AdminBreadcrumb />
        
        <div className="space-y-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              Gestion des Leads
            </h1>
            <p className="text-muted-foreground text-lg">
              Gérez efficacement vos prospects et suivez leur progression
            </p>
          </div>

          <LeadStats leads={leads} />

          <Card className="overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm">
            <div className="p-6 space-y-6">
              <LeadHeader
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onExportClick={() => {
                  console.log("Export to CSV requested");
                  toast({
                    title: "Export",
                    description: "L'export des leads sera bientôt disponible",
                  });
                }}
                onNewLeadClick={() => {
                  console.log("New lead creation requested");
                  handleEditClick({} as any);
                }}
              />

              <div className="rounded-md border border-primary/10 bg-background/50">
                {isMobile ? (
                  <LeadMobileTable
                    leads={leads}
                    onEditClick={handleEditClick}
                    onAssignClick={handleAssignClick}
                    onDeleteClick={handleDeleteClick}
                    getStatusColor={getStatusColor}
                    getStatusText={getStatusText}
                  />
                ) : (
                  <LeadTable
                    leads={leads}
                    onEditClick={handleEditClick}
                    onAssignClick={handleAssignClick}
                    onDeleteClick={handleDeleteClick}
                    getStatusColor={getStatusColor}
                    getStatusText={getStatusText}
                  />
                )}
              </div>
            </div>
          </Card>

          {renderDialogs()}
        </div>
      </div>
    </div>
  );
};

export default LeadManagement;