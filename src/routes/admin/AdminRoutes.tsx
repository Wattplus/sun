import { Routes, Route } from "react-router-dom"
import { Admin } from "@/pages/Admin"

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  )
}