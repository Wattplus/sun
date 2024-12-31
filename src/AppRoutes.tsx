import { Routes, Route } from "react-router-dom"
import { Index } from "@/pages/Index"
import { Admin } from "@/pages/Admin"
import { Login } from "@/pages/Login"
import { InstallerSpace } from "@/pages/installer/InstallerSpace"
import { InstallerRoutes } from "@/routes/installer/InstallerRoutes"
import { ProtectedRoute } from "@/routes/ProtectedRoute"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/espace-installateur/*"
        element={
          <ProtectedRoute allowedRoles={["installer"]}>
            <InstallerSpace />
            <InstallerRoutes />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}