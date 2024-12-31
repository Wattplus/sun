import { Routes, Route } from "react-router-dom"
import { InstallerProfilePage } from "@/pages/installer/profile/InstallerProfilePage"

export const InstallerRoutes = () => {
  return (
    <Routes>
      <Route path="/espace-installateur/*" element={<InstallerProfilePage />} />
    </Routes>
  )
}