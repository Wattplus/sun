import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuthRedirect();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { toast } = useToast();

  const checkAdminStatus = useCallback(async () => {
    try {
      if (!isAuthenticated) {
        setCheckingAdmin(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Utilisateur non trouvé");
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Erreur lors de la récupération du profil:', error);
        setIsAdmin(false);
      } else {
        const hasAdminRole = profile?.role === 'admin' || profile?.role === 'super_admin';
        console.log("Rôle utilisateur:", profile?.role);
        console.log("A les droits admin:", hasAdminRole);
        setIsAdmin(hasAdminRole);
      }
    } catch (error) {
      console.error('Erreur de vérification admin:', error);
      setIsAdmin(false);
    } finally {
      setCheckingAdmin(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    checkAdminStatus();
  }, [checkAdminStatus]);

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
    console.log("Utilisateur non-admin tentant d'accéder à une route admin");
    // Using setTimeout to avoid render-time toast calls
    setTimeout(() => {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits d'administration nécessaires",
        variant: "destructive",
      });
    }, 0);
    return <Navigate to="/dashboard" />;
  }

  console.log("Accès à la route autorisé");
  return <Outlet />;
};