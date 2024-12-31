import { Routes, Route } from "react-router-dom"
import { InstallerProfilePage } from "@/pages/installer/profile/InstallerProfilePage"
import { DashboardContent } from "@/components/installer/dashboard/DashboardContent"
import { MarketplacePage } from "@/components/installer/marketplace/MarketplacePage"
import { MessagesPage } from "@/components/installer/messages/MessagesPage"
import { SettingsPage } from "@/components/installer/settings/SettingsPage"
import { HelpPage } from "@/components/installer/help/HelpPage"

export const InstallerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardContent />} />
      <Route path="/profil" element={<InstallerProfilePage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/parametres" element={<SettingsPage />} />
      <Route path="/aide" element={<HelpPage />} />
    </Routes>
  )
}