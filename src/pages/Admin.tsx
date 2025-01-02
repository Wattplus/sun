import { Outlet } from "react-router-dom"
import { AdminNavigation } from "@/components/admin/AdminNavigation"
import { Helmet } from "react-helmet"

const Admin = () => {
  return (
    <>
      <Helmet>
        <title>Administration - Solar Pro</title>
      </Helmet>
      <div className="flex min-h-screen">
        <aside className="w-64 bg-gray-900 p-6">
          <AdminNavigation />
        </aside>
        <main className="flex-1 bg-background">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default Admin;