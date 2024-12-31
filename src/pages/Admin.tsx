import { Outlet, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/components/ui/use-toast";
import AdminDashboard from "@/components/admin/AdminDashboard";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsAdmin(false);
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        setIsAdmin(profile?.role === 'admin' || profile?.role === 'super_admin');

        if (!profile || (profile.role !== 'admin' && profile.role !== 'super_admin')) {
          toast({
            title: "Accès refusé",
            description: "Vous n'avez pas les permissions nécessaires pour accéder à cette page.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [toast]);

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background/95 to-background/50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (isAdmin === false) {
    return <Navigate to="/" replace />;
  }

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
      <AdminDashboard />
    </>
  );
};

export default Admin;