import { Routes, Route } from "react-router-dom"
import { Index } from "@/pages/Index"
import Admin from "@/pages/Admin"
import Login from "@/pages/Login"
import { InstallerSpace } from "@/pages/installer/InstallerSpace"
import { ProtectedRoute } from "@/routes/ProtectedRoute"
import { InstallerManagement } from "@/components/admin/InstallerManagement"
import { UserManagement } from "@/components/admin/users/UserManagement"
import { LeadManagementContainer } from "@/components/admin/leads/LeadManagementContainer"
import { LeadMarketplace } from "@/components/admin/marketplace/LeadMarketplace"
import { PricingSettings } from "@/components/admin/pricing/PricingSettings"
import { TransactionMonitoring } from "@/components/admin/transactions/TransactionMonitoring"
import { ComplaintManagement } from "@/components/admin/complaints/ComplaintManagement"
import { DataExport } from "@/components/admin/export/DataExport"
import { NotificationsPage } from "@/components/admin/notifications/NotificationsPage"
import { SettingsPage } from "@/components/admin/settings/SettingsPage"
import { ProfilePage } from "@/components/admin/profile/ProfilePage"
import { StatisticsPage } from "@/components/admin/statistics/StatisticsPage"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requiredRole={["admin", "super_admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route index element={<LeadManagementContainer />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="leads" element={<LeadManagementContainer />} />
        <Route path="installers" element={<InstallerManagement />} />
        <Route path="marketplace" element={<LeadMarketplace />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="pricing" element={<PricingSettings />} />
        <Route path="transactions" element={<TransactionMonitoring />} />
        <Route path="complaints" element={<ComplaintManagement />} />
        <Route path="export" element={<DataExport />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route
        path="/espace-installateur/*"
        element={
          <ProtectedRoute requiredRole={["installer"]}>
            <InstallerSpace />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}