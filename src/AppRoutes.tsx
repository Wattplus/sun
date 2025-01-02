import { Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { InstallerLogin } from "@/pages/installer/auth/InstallerLogin";
import { InstallerSignup } from "@/pages/installer/auth/InstallerSignup";
import { InstallerSpace } from "@/pages/installer/InstallerSpace";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { Admin } from "@/pages/Admin";
import { Login } from "@/pages/Login";
import { ThankYou } from "@/pages/ThankYou";
import { InstallerProfile } from "@/pages/InstallerProfile";
import { AccountPage } from "@/components/installer/account/AccountPage";
import { NotificationsPage } from "@/components/installer/notifications/NotificationsPage";
import { PrepaidAccountPage } from "@/pages/installer/account/PrepaidAccountPage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/connexion-installateur" element={<InstallerLogin />} />
      <Route path="/devenir-installateur" element={<InstallerSignup />} />
      <Route path="/inscription-installateur" element={<InstallerSignup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/merci" element={<ThankYou />} />
      <Route path="/installateur/:id" element={<InstallerProfile />} />

      {/* Protected installer routes */}
      <Route
        path="/espace-installateur/*"
        element={
          <ProtectedRoute>
            <InstallerSpace />
          </ProtectedRoute>
        }
      />

      {/* Protected admin routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

      {/* Account routes */}
      <Route path="/account" element={<AccountPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/prepaid-account" element={<PrepaidAccountPage />} />
    </Routes>
  );
};