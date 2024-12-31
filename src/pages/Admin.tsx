import AdminDashboard from "@/components/admin/AdminDashboard"
import { Helmet } from "react-helmet"

export default function Admin() {
  return (
    <>
      <Helmet>
        <title>Administration - Solar Pro</title>
      </Helmet>
      <AdminDashboard />
    </>
  )
}