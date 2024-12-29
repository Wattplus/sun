import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuthRedirect();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (isAuthenticated) {
        console.log("Checking admin status...");
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .single();
        
        const hasAdminRole = profile?.role === 'admin' || profile?.role === 'super_admin';
        console.log("User role:", profile?.role);
        console.log("Has admin access:", hasAdminRole);
        
        setIsAdmin(hasAdminRole);
        setCheckingAdmin(false);
      } else {
        setCheckingAdmin(false);
      }
    };

    checkAdminStatus();
  }, [isAuthenticated]);

  if (isLoading || checkingAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to={isAdminRoute ? "/admin/login" : "/login"} />;
  }

  if (isAdminRoute && !isAdmin) {
    console.log("Non-admin user attempting to access admin route, redirecting to dashboard");
    return <Navigate to="/dashboard" />;
  }

  console.log("Route access granted");
  return <Outlet />;
};