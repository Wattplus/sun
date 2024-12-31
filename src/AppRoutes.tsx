import { Route } from "react-router-dom"
import { useAuthRedirect } from "@/routes/useAuthRedirect"
import { ProtectedRoute } from "@/routes/ProtectedRoute"

// Public pages
import Index from "@/pages/Index"
import Login from "@/pages/Login"
import AboutUs from "@/pages/AboutUs"
import Blog from "@/pages/Blog"
import Contact from "@/pages/Contact"
import FAQ from "@/pages/FAQ"
import Financing from "@/pages/Financing"
import LegalNotice from "@/pages/LegalNotice"
import OurMission from "@/pages/OurMission"
import PrivacyPolicy from "@/pages/PrivacyPolicy"
import SolarInstallation from "@/pages/SolarInstallation"
import TermsOfService from "@/pages/TermsOfService"

// Admin components
import AdminDashboard from "@/components/admin/AdminDashboard"
import LeadManagement from "@/components/admin/LeadManagement"
import InstallerManagement from "@/components/admin/InstallerManagement"
import StatisticsPage from "@/components/admin/statistics/StatisticsPage"
import LeadMarketplace from "@/components/admin/marketplace/LeadMarketplace"
import UserManagement from "@/components/admin/users/UserManagement"
import PricingSettings from "@/components/admin/pricing/PricingSettings"
import TransactionMonitoring from "@/components/admin/transactions/TransactionMonitoring"
import ComplaintManagement from "@/components/admin/complaints/ComplaintManagement"
import DataExport from "@/components/admin/export/DataExport"
import NotificationsPage from "@/components/admin/notifications/NotificationsPage"
import SettingsPage from "@/components/admin/settings/SettingsPage"
import AdminProfilePage from "@/components/admin/profile/ProfilePage"

// Installer components
import { InstallerDashboard } from "@/components/installer/dashboard/DashboardContent"
import { InstallerProfile } from "@/components/installer/profile/ProfilePage"
import { InstallerLeads } from "@/components/installer/leads/PurchasedLeadsPage"
import { InstallerSettings } from "@/components/installer/settings/SettingsPage"
import { InstallerBilling } from "@/components/installer/marketplace/MarketplacePage"
import { InstallerNotifications } from "@/components/installer/messages/MessagesPage"
import { InstallerSupport } from "@/components/installer/help/HelpPage"

export const AppRoutes = () => {
  useAuthRedirect()

  return (
    <>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/financing" element={<Financing />} />
      <Route path="/legal" element={<LegalNotice />} />
      <Route path="/mission" element={<OurMission />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/solar-installation" element={<SolarInstallation />} />
      <Route path="/terms" element={<TermsOfService />} />

      {/* Admin Routes */}
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

      {/* Installer Routes */}
      <Route path="/installer" element={
        <ProtectedRoute>
          <InstallerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/installer/profile" element={
        <ProtectedRoute>
          <InstallerProfile />
        </ProtectedRoute>
      } />
      <Route path="/installer/leads" element={
        <ProtectedRoute>
          <InstallerLeads />
        </ProtectedRoute>
      } />
      <Route path="/installer/settings" element={
        <ProtectedRoute>
          <InstallerSettings />
        </ProtectedRoute>
      } />
      <Route path="/installer/billing" element={
        <ProtectedRoute>
          <InstallerBilling />
        </ProtectedRoute>
      } />
      <Route path="/installer/notifications" element={
        <ProtectedRoute>
          <InstallerNotifications />
        </ProtectedRoute>
      } />
      <Route path="/installer/support" element={
        <ProtectedRoute>
          <InstallerSupport />
        </ProtectedRoute>
      } />
    </>
  )
}