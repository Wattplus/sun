import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useAuthRedirect } from "@/routes/useAuthRedirect"
import { ProtectedRoute } from "@/routes/ProtectedRoute"
import Index from "@/pages/Index"
import Login from "@/pages/Login"
import Admin from "@/pages/Admin"
import { ThankYou } from "@/pages/ThankYou"
import { CheckoutPage } from "@/pages/installer/payment/CheckoutPage"
import { PrepaidAccountPage } from "@/pages/installer/account/PrepaidAccountPage"
import { NewProfilePage } from "@/pages/installer/profile/NewProfilePage"
import { InstallerSignup } from "@/pages/installer/auth/InstallerSignup"
import { InstallerProfile } from "@/pages/InstallerProfile"

export const AppRoutes = () => {
  useAuthRedirect()

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/devenir-installateur" element={<InstallerSignup />} />
        
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
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRole={['admin', 'super_admin']}>
            <Admin />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}