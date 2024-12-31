import { Route } from "react-router-dom"
import { ProtectedRoute } from "@/routes/ProtectedRoute"
import { DashboardContent } from "@/components/installer/dashboard/DashboardContent"
import { ProfilePage } from "@/components/installer/profile/ProfilePage"
import { PurchasedLeadsPage } from "@/components/installer/leads/PurchasedLeadsPage"
import { SettingsPage } from "@/components/installer/settings/SettingsPage"
import { MarketplacePage } from "@/components/installer/marketplace/MarketplacePage"
import { MessagesPage } from "@/components/installer/messages/MessagesPage"
import { HelpPage } from "@/components/installer/help/HelpPage"

export const InstallerRoutes = () => {
  return (
    <>
      <Route path="/installer" element={
        <ProtectedRoute>
          <DashboardContent />
        </ProtectedRoute>
      } />
      <Route path="/installer/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
      <Route path="/installer/leads" element={
        <ProtectedRoute>
          <PurchasedLeadsPage />
        </ProtectedRoute>
      } />
      <Route path="/installer/settings" element={
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      } />
      <Route path="/installer/billing" element={
        <ProtectedRoute>
          <MarketplacePage />
        </ProtectedRoute>
      } />
      <Route path="/installer/notifications" element={
        <ProtectedRoute>
          <MessagesPage />
        </ProtectedRoute>
      } />
      <Route path="/installer/support" element={
        <ProtectedRoute>
          <HelpPage />
        </ProtectedRoute>
      } />
    </>
  )
}