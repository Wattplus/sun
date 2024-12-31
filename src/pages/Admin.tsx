import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Accès refusé",
          description: "Veuillez vous connecter pour accéder à l'interface d'administration",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      // Vérifier si l'utilisateur a le rôle admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
        toast({
          title: "Accès refusé",
          description: "Vous n'avez pas les permissions nécessaires pour accéder à cette page",
          variant: "destructive",
        });
        navigate("/");
        return;
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <>
      <Helmet>
        <title>Administration - Gestion des Installations Solaires</title>
        <meta 
          name="description" 
          content="Interface d'administration pour la gestion des projets d'installation solaire et le suivi des clients." 
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Outlet />
    </>
  );
};

export default Admin;
