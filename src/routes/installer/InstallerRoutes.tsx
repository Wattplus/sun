import { Routes, Route } from "react-router-dom"
import { InstallerLayout } from "@/components/installer/navigation/InstallerLayout"
import { DashboardContent } from "@/components/installer/dashboard/DashboardContent"
import { AccountPage } from "@/pages/installer/account/AccountPage"
import { NewProfilePage } from "@/pages/installer/profile/NewProfilePage"
import { InstallerProfilePage } from "@/pages/installer/profile/InstallerProfilePage"
import { MarketplacePage } from "@/components/installer/marketplace/MarketplacePage"
import { MessagesPage } from "@/components/installer/messages/MessagesPage"
import { SettingsPage } from "@/components/installer/settings/SettingsPage"
import { HelpPage } from "@/components/installer/help/HelpPage"
import { CheckoutPage } from "@/pages/installer/payment/CheckoutPage"
import { NewCardPage } from "@/pages/installer/payment/NewCardPage"

export const InstallerRoutes = () => {
  return (
    <Routes>
      <Route element={<InstallerLayout />}>
        <Route index element={<DashboardContent />} />
        <Route path="profil" element={<InstallerProfilePage />} />
        <Route path="profil/nouveau" element={<NewProfilePage />} />
        <Route path="compte" element={<AccountPage />} />
        <Route path="marketplace" element={<MarketplacePage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="parametres" element={<SettingsPage />} />
        <Route path="aide" element={<HelpPage />} />
        <Route path="paiement">
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="nouvelle-carte" element={<NewCardPage />} />
        </Route>
      </Route>
    </Routes>
  )
}