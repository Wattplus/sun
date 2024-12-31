import { useAuthRedirect } from "@/routes/useAuthRedirect"
import { PublicRoutes } from "./routes/public/PublicRoutes"
import { AdminRoutes } from "./routes/admin/AdminRoutes"
import { InstallerRoutes } from "./routes/installer/InstallerRoutes"

export const AppRoutes = () => {
  useAuthRedirect()

  return (
    <>
      <PublicRoutes />
      <AdminRoutes />
      <InstallerRoutes />
    </>
  )
}