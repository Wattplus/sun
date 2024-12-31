import { Routes, Route } from "react-router-dom"
import { InstallerProfile } from "@/pages/installer/profile/InstallerProfilePage"

export const InstallerRoutes = () => {
  return (
    <Routes>
      <Route path="/espace-installateur/*" element={<InstallerProfile />} />
    </Routes>
  )
}