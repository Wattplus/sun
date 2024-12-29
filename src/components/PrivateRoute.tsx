import { Navigate, Outlet } from "react-router-dom";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuthRedirect();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};