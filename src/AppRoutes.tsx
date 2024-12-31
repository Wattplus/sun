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
import { InstallerManagement } from "@/components/admin/InstallerManagement"

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
      <Route path="/espace-installateur/*" element={
        <ProtectedRoute>
          <InstallerProfile />
        </ProtectedRoute>
      } />
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
      <Route path="/installer/profile" element={
        <ProtectedRoute>
          <NewProfilePage />
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