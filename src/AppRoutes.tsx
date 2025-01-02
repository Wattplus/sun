import { Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import InstallerLogin from "@/pages/installer/auth/InstallerLogin";
import InstallerSignup from "@/pages/installer/auth/InstallerSignup";
import { InstallerSpace } from "@/pages/installer/InstallerSpace";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import { ThankYou } from "@/pages/ThankYou";
import { InstallerProfile } from "@/pages/InstallerProfile";
import { AccountPage } from "@/components/installer/account/AccountPage";
import { NotificationsPage as InstallerNotificationsPage } from "@/components/installer/notifications/NotificationsPage";
import { PrepaidAccountPage } from "@/pages/installer/account/PrepaidAccountPage";
import AdminDashboard from "@/components/admin/AdminDashboard";
import StatisticsPage from "@/components/admin/statistics/StatisticsPage";
import { LeadManagement } from "@/components/admin/LeadManagement";
import { InstallerManagement } from "@/components/admin/InstallerManagement";
import { LeadMarketplace } from "@/components/admin/marketplace/LeadMarketplace";
import UserManagement from "@/components/admin/users/UserManagement";
import PricingSettings from "@/components/admin/pricing/PricingSettings";
import TransactionMonitoring from "@/components/admin/transactions/TransactionMonitoring";
import ComplaintManagement from "@/components/admin/complaints/ComplaintManagement";
import DataExport from "@/components/admin/export/DataExport";
import AdminNotificationsPage from "@/components/admin/notifications/NotificationsPage";
import SettingsPage from "@/components/admin/settings/SettingsPage";
import AdminProfilePage from "@/components/admin/profile/ProfilePage";
import AffiliationManagement from "@/components/admin/affiliation/AffiliationManagement";

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
        path="/admin"
        element={
          <ProtectedRoute requiredRole={["admin", "super_admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="leads" element={<LeadManagement />} />
        <Route path="installers" element={<InstallerManagement />} />
        <Route path="marketplace" element={<LeadMarketplace />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="pricing" element={<PricingSettings />} />
        <Route path="transactions" element={<TransactionMonitoring />} />
        <Route path="complaints" element={<ComplaintManagement />} />
        <Route path="affiliation" element={<AffiliationManagement />} />
        <Route path="export" element={<DataExport />} />
        <Route path="notifications" element={<AdminNotificationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="profile" element={<AdminProfilePage />} />
      </Route>

      {/* Account routes */}
      <Route path="/account" element={<AccountPage />} />
      <Route path="/notifications" element={<InstallerNotificationsPage />} />
      <Route path="/prepaid-account" element={<PrepaidAccountPage />} />
    </Routes>
  );
};