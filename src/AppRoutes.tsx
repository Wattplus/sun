import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { PublicRoutes } from "@/routes/public/PublicRoutes";
import { AdminRoutes } from "@/routes/admin/AdminRoutes";
import { InstallerSpace } from "@/pages/installer/InstallerSpace";
import InstallerLogin from "@/pages/installer/auth/InstallerLogin";
import InstallerSignup from "@/pages/installer/auth/InstallerSignup";
import { LandingPage } from "@/pages/LandingPage";
import { InstallerDashboard } from "@/components/installer/InstallerDashboard";
import { MarketplacePage } from "@/components/installer/marketplace/MarketplacePage";
import { PurchasedLeadsPage } from "@/components/installer/leads/PurchasedLeadsPage";
import { MessagesPage } from "@/components/installer/messages/MessagesPage";
import { ProfilePage } from "@/components/installer/profile/ProfilePage";
import { AccountPage } from "@/components/installer/account/AccountPage";
import { NotificationsPage } from "@/components/installer/notifications/NotificationsPage";
import { PrepaidAccountPage } from "@/pages/installer/account/PrepaidAccountPage";
import { Index } from "@/pages/Index";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/connexion-installateur" element={<InstallerLogin />} />
      <Route path="/devenir-installateur" element={<InstallerSignup />} />
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
        <Route path="marketplace" element={<MarketplacePage />} />
        <Route path="leads" element={<PurchasedLeadsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="mon-compte" element={<ProfilePage />} />
        <Route path="mon-compte/prepaid" element={<PrepaidAccountPage />} />
        <Route path="parametres" element={<AccountPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
      </Route>

      {/* Catch all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};