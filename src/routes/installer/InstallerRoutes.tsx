import { Routes, Route } from "react-router-dom"
import { DashboardContent } from "@/components/installer/dashboard/DashboardContent"
import { ProfilePage } from "@/components/installer/profile/ProfilePage"

export const InstallerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardContent />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}