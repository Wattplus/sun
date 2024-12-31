import { Routes, Route, Navigate } from "react-router-dom";
import { Index } from "@/pages/Index";
import Login from "@/pages/Login";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { InstallerManagement } from "@/components/admin/InstallerManagement";
import { LeadManagement } from "@/components/admin/LeadManagement";
import { InstallerSpace } from "@/pages/installer/InstallerSpace";
import InstallerLogin from "@/pages/installer/auth/InstallerLogin";
import { InstallerSignup } from "@/pages/installer/auth/InstallerSignup";
import { LandingPage } from "@/pages/LandingPage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/index" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/connexion-installateur" element={<InstallerLogin />} />
      <Route path="/devenir-installateur" element={<InstallerSignup />} />

      {/* Protected admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="installers" element={<InstallerManagement />} />
        <Route path="leads" element={<LeadManagement />} />
      </Route>

      {/* Protected installer routes */}
      <Route
        path="/espace-installateur/*"
        element={
          <ProtectedRoute>
            <InstallerSpace />
          </ProtectedRoute>
        }
      />

      {/* Catch all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};