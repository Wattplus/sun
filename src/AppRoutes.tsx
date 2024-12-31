import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { PublicRoutes } from "@/routes/public/PublicRoutes";
import { AdminRoutes } from "@/routes/admin/AdminRoutes";
import { InstallerSpace } from "@/pages/installer/InstallerSpace";
import InstallerLogin from "@/pages/installer/auth/InstallerLogin";
import { InstallerSignup } from "@/pages/installer/auth/InstallerSignup";
import { LandingPage } from "@/pages/LandingPage";
import { InstallerDashboard } from "@/components/installer/InstallerDashboard";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/connexion-installateur" element={<InstallerLogin />} />
      <Route path="/inscription-installateur" element={<InstallerSignup />} />
      
      {/* Public pages */}
      <Route path="/*" element={<PublicRoutes />} />

      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />

      {/* Protected installer routes */}
      <Route
        path="/espace-installateur"
        element={
          <ProtectedRoute>
            <InstallerSpace />
          </ProtectedRoute>
        }
      >
        <Route index element={<InstallerDashboard />} />
        <Route path="marketplace" element={<InstallerDashboard />} />
        <Route path="leads" element={<InstallerDashboard />} />
        <Route path="messages" element={<InstallerDashboard />} />
        <Route path="mon-compte" element={<InstallerDashboard />} />
        <Route path="parametres" element={<InstallerDashboard />} />
        <Route path="notifications" element={<InstallerDashboard />} />
      </Route>

      {/* Catch all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};