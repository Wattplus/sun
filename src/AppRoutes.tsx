import { Routes, Route } from "react-router-dom"
import Login from "@/pages/Login"
import { ProtectedRoute } from "@/routes/ProtectedRoute"
import AdminLayout from "@/components/admin/AdminLayout"
import AdminDashboard from "@/components/admin/AdminDashboard"
import { InstallerManagement } from "@/components/admin/InstallerManagement"
import { LeadManagement } from "@/components/admin/LeadManagement"
import ComplaintManagement from "@/components/admin/complaints/ComplaintManagement"
import DataExport from "@/components/admin/export/DataExport"
import NotificationsPage from "@/components/admin/notifications/NotificationsPage"
import PricingSettings from "@/components/admin/pricing/PricingSettings"
import ProfilePage from "@/components/admin/profile/ProfilePage"
import SettingsPage from "@/components/admin/settings/SettingsPage"
import StatisticsPage from "@/components/admin/statistics/StatisticsPage"
import { InstallerSignup } from "@/pages/installer/auth/InstallerSignup"
import { InstallerLogin } from "@/pages/installer/auth/InstallerLogin"
import { InstallerDashboard } from "@/components/installer/InstallerDashboard"
import { AccountPage } from "@/components/installer/account/AccountPage"
import { MessagesPage } from "@/components/installer/messages/MessagesPage"
import { InstallerLayout } from "@/components/installer/navigation/InstallerLayout"
import { MarketplacePage } from "@/components/installer/marketplace/MarketplacePage"
import { PurchasedLeadsPage } from "@/components/installer/leads/PurchasedLeadsPage"
import { SettingsPage as InstallerSettingsPage } from "@/components/installer/settings/SettingsPage"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/connexion-installateur" element={<InstallerLogin />} />
      <Route path="/devenir-installateur" element={<InstallerSignup />} />
      
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requiredRole={["admin", "super_admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="installers" element={<InstallerManagement />} />
        <Route path="leads" element={<LeadManagement />} />
        <Route path="complaints" element={<ComplaintManagement />} />
        <Route path="export" element={<DataExport />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="pricing" element={<PricingSettings />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route
        path="/espace-installateur/*"
        element={
          <ProtectedRoute requiredRole={["installer"]}>
            <InstallerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<InstallerDashboard />} />
        <Route path="marketplace" element={<MarketplacePage />} />
        <Route path="leads" element={<PurchasedLeadsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="mon-compte" element={<AccountPage />} />
        <Route path="parametres" element={<InstallerSettingsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
      </Route>
    </Routes>
  )
}