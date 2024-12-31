import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const InstallerManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Error checking session:", sessionError);
          toast({
            title: "Erreur d'authentification",
            description: "Impossible de vérifier votre session",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }

        if (!session) {
          console.log("No active session");
          toast({
            title: "Non authentifié",
            description: "Vous devez être connecté pour accéder à cette page",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }

        // Vérifier le rôle de l'utilisateur
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          toast({
            title: "Erreur",
            description: "Impossible de vérifier vos permissions",
            variant: "destructive",
          });
          return;
        }

        if (!['admin', 'super_admin'].includes(profile.role)) {
          console.log("User is not an admin");
          toast({
            title: "Accès refusé",
            description: "Vous n'avez pas les permissions nécessaires",
            variant: "destructive",
          });
          navigate("/");
          return;
        }

      } catch (error) {
        console.error("Unexpected error:", error);
        toast({
          title: "Erreur",
          description: "Une erreur inattendue s'est produite",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
              Gestion des Installateurs
            </h1>
            <p className="text-muted-foreground text-lg">
              Gérez les installateurs partenaires et leurs accès
            </p>
          </div>

          <Card className="p-6">
            {/* Contenu à implémenter */}
            <p className="text-muted-foreground">
              Cette fonctionnalité sera bientôt disponible.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstallerManagement;