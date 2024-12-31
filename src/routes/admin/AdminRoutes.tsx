import { Route } from "react-router-dom"
import { ProtectedRoute } from "@/routes/ProtectedRoute"
import AdminDashboard from "@/components/admin/AdminDashboard"
import LeadManagement from "@/components/admin/LeadManagement"
import InstallerManagement from "@/components/admin/InstallerManagement"
import StatisticsPage from "@/components/admin/statistics/StatisticsPage"
import { LeadMarketplace } from "@/components/admin/marketplace/LeadMarketplace"
import UserManagement from "@/components/admin/users/UserManagement"
import PricingSettings from "@/components/admin/pricing/PricingSettings"
import TransactionMonitoring from "@/components/admin/transactions/TransactionMonitoring"
import ComplaintManagement from "@/components/admin/complaints/ComplaintManagement"
import DataExport from "@/components/admin/export/DataExport"
import NotificationsPage from "@/components/admin/notifications/NotificationsPage"
import SettingsPage from "@/components/admin/settings/SettingsPage"
import AdminProfilePage from "@/components/admin/profile/ProfilePage"

export const AdminRoutes = () => {
  return (
    <>
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/leads" element={
        <ProtectedRoute>
          <LeadManagement />
        </ProtectedRoute>
      } />
      <Route path="/admin/installers" element={
        <ProtectedRoute>
          <InstallerManagement />
        </ProtectedRoute>
      } />
      <Route path="/admin/statistics" element={
        <ProtectedRoute>
          <StatisticsPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/marketplace" element={
        <ProtectedRoute>
          <LeadMarketplace />
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute>
          <UserManagement />
        </ProtectedRoute>
      } />
      <Route path="/admin/pricing" element={
        <ProtectedRoute>
          <PricingSettings />
        </ProtectedRoute>
      } />
      <Route path="/admin/transactions" element={
        <ProtectedRoute>
          <TransactionMonitoring />
        </ProtectedRoute>
      } />
      <Route path="/admin/complaints" element={
        <ProtectedRoute>
          <ComplaintManagement />
        </ProtectedRoute>
      } />
      <Route path="/admin/export" element={
        <ProtectedRoute>
          <DataExport />
        </ProtectedRoute>
      } />
      <Route path="/admin/notifications" element={
        <ProtectedRoute>
          <NotificationsPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/settings" element={
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/profile" element={
        <ProtectedRoute>
          <AdminProfilePage />
        </ProtectedRoute>
      } />
    </>
  )
}