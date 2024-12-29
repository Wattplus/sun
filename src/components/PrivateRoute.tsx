import { Navigate, Outlet } from "react-router-dom";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuthRedirect();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};