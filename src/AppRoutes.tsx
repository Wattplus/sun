import { Routes, Route } from "react-router-dom"
import { useAuthRedirect } from "@/routes/useAuthRedirect"
import { ProtectedRoute } from "@/routes/ProtectedRoute"
import Index from "@/pages/Index"
import Login from "@/pages/Login"
import AdminDashboard from "@/components/admin/AdminDashboard"
import { ThankYou } from "@/pages/ThankYou"
import { CheckoutPage } from "@/pages/installer/payment/CheckoutPage"
import { PrepaidAccountPage } from "@/pages/installer/account/PrepaidAccountPage"
import { NewProfilePage } from "@/pages/installer/profile/NewProfilePage"
import { InstallerSignup } from "@/pages/installer/auth/InstallerSignup"
import { InstallerProfile } from "@/pages/InstallerProfile"
import { InstallerDashboard } from "@/components/installer/InstallerDashboard"
import { AboutUs } from "@/pages/AboutUs"
import { OurMission } from "@/pages/OurMission"
import { Blog } from "@/pages/Blog"
import { SolarInstallation } from "@/pages/SolarInstallation"
import { Maintenance } from "@/pages/Maintenance"
import { Financing } from "@/pages/Financing"
import { Pricing } from "@/pages/Pricing"
import { Contact } from "@/pages/Contact"
import { FAQ } from "@/pages/FAQ"
import { LegalNotice } from "@/pages/LegalNotice"
import { PrivacyPolicy } from "@/pages/PrivacyPolicy"
import { TermsOfService } from "@/pages/TermsOfService"
import { LeadManagement } from "@/components/admin/LeadManagement"
import InstallerManagement from "@/components/admin/InstallerManagement"
import { MessagesPage } from "@/components/installer/messages/MessagesPage"
import { ConversationPage } from "@/components/installer/messages/ConversationPage"
import { MarketplacePage } from "@/components/installer/marketplace/MarketplacePage"
import { NewLeadsPage } from "@/components/installer/marketplace/NewLeadsPage"
import { PurchasedLeadsPage } from "@/components/installer/leads/PurchasedLeadsPage"
import { LeadDetailsPage } from "@/components/installer/leads/LeadDetailsPage"
import { AccountPage } from "@/components/installer/account/AccountPage"
import { SettingsPage } from "@/components/installer/settings/SettingsPage"
import { HelpPage } from "@/components/installer/help/HelpPage"
import { ClientsPage } from "@/components/installer/clients/ClientsPage"

export const AppRoutes = () => {
  useAuthRedirect()

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/devenir-installateur" element={<InstallerSignup />} />
      
      {/* Footer Routes */}
      <Route path="/qui-sommes-nous" element={<AboutUs />} />
      <Route path="/notre-mission" element={<OurMission />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/installation-solaire" element={<SolarInstallation />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/financement" element={<Financing />} />
      <Route path="/tarifs" element={<Pricing />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/mentions-legales" element={<LegalNotice />} />
      <Route path="/confidentialite" element={<PrivacyPolicy />} />
      <Route path="/cgv" element={<TermsOfService />} />
      
      {/* Installer Routes */}
      <Route path="/espace-installateur" element={
        <ProtectedRoute>
          <InstallerDashboard />
        </ProtectedRoute>
      } />
      
      {/* Installer Marketplace Routes */}
      <Route path="/espace-installateur/marketplace" element={
        <ProtectedRoute>
          <MarketplacePage />
        </ProtectedRoute>
      } />
      <Route path="/espace-installateur/leads/nouveaux" element={
        <ProtectedRoute>
          <NewLeadsPage />
        </ProtectedRoute>
      } />
      <Route path="/espace-installateur/leads/achetes" element={
        <ProtectedRoute>
          <PurchasedLeadsPage />
        </ProtectedRoute>
      } />
      <Route path="/espace-installateur/leads/:leadId" element={
        <ProtectedRoute>
          <LeadDetailsPage />
        </ProtectedRoute>
      } />

      {/* Installer Account Routes */}
      <Route path="/espace-installateur/compte" element={
        <ProtectedRoute>
          <AccountPage />
        </ProtectedRoute>
      } />
      <Route path="/espace-installateur/parametres" element={
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      } />
      <Route path="/espace-installateur/profil" element={
        <ProtectedRoute>
          <NewProfilePage />
        </ProtectedRoute>
      } />

      {/* Installer Messages Routes */}
      <Route path="/espace-installateur/messages" element={
        <ProtectedRoute>
          <MessagesPage />
        </ProtectedRoute>
      } />
      <Route path="/espace-installateur/messages/:conversationId" element={
        <ProtectedRoute>
          <ConversationPage />
        </ProtectedRoute>
      } />

      {/* Installer Clients Routes */}
      <Route path="/espace-installateur/clients" element={
        <ProtectedRoute>
          <ClientsPage />
        </ProtectedRoute>
      } />

      {/* Installer Help Routes */}
      <Route path="/espace-installateur/aide" element={
        <ProtectedRoute>
          <HelpPage />
        </ProtectedRoute>
      } />

      {/* Installer Payment Routes */}
      <Route path="/installer/checkout" element={
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>
      } />
      <Route path="/installer/prepaid" element={
        <ProtectedRoute>
          <PrepaidAccountPage />
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute requiredRole={['admin', 'super_admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/leads" element={
        <ProtectedRoute requiredRole={['admin', 'super_admin']}>
          <LeadManagement />
        </ProtectedRoute>
      } />
      <Route path="/admin/installers" element={
        <ProtectedRoute requiredRole={['admin', 'super_admin']}>
          <InstallerManagement />
        </ProtectedRoute>
      } />
    </Routes>
  )
}