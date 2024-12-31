import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout