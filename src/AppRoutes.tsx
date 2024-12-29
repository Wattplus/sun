import { Routes, Route } from "react-router-dom";
import { Login } from "@/pages/Login";
import { CreateSuperAdmin } from "@/pages/CreateSuperAdmin";
import { PrivateRoute } from "@/components/PrivateRoute";
import { Dashboard } from "@/pages/Dashboard";
import { Profile } from "@/pages/Profile";
import { Settings } from "@/pages/Settings";
import { NotFound } from "@/pages/NotFound";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/create-super-admin" element={<CreateSuperAdmin />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};