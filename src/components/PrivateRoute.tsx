import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuthRedirect();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (isAuthenticated) {
        console.log("Vérification du statut administrateur...");
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) {
            throw new Error("Utilisateur non trouvé");
          }

          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .maybeSingle();
          
          if (error) {
            console.error('Erreur lors de la récupération du profil:', error);
            setIsAdmin(false);
            toast({
              title: "Erreur",
              description: "Impossible de vérifier les droits d'accès",
              variant: "destructive",
            });
          } else {
            const hasAdminRole = profile?.role === 'admin' || profile?.role === 'super_admin';
            console.log("Rôle utilisateur:", profile?.role);
            console.log("A les droits admin:", hasAdminRole);
            setIsAdmin(hasAdminRole);
          }
        } catch (error) {
          console.error('Erreur de vérification admin:', error);
          setIsAdmin(false);
          toast({
            title: "Erreur",
            description: "Une erreur est survenue lors de la vérification des droits",
            variant: "destructive",
          });
        }
        setCheckingAdmin(false);
      } else {
        setCheckingAdmin(false);
      }
    };

    checkAdminStatus();
  }, [isAuthenticated, toast]);

  if (isLoading || checkingAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("Utilisateur non authentifié, redirection vers la page de connexion");
    return <Navigate to={isAdminRoute ? "/admin/login" : "/login"} />;
  }

  if (isAdminRoute && !isAdmin) {
    console.log("Utilisateur non-admin tentant d'accéder à une route admin, redirection vers le tableau de bord");
    toast({
      title: "Accès refusé",
      description: "Vous n'avez pas les droits d'administration nécessaires",
      variant: "destructive",
    });
    return <Navigate to="/dashboard" />;
  }

  console.log("Accès à la route autorisé");
  return <Outlet />;
};