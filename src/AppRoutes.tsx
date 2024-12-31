import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ThankYou from "./pages/ThankYou";
import InstallerSignup from "./pages/installer/InstallerSignup";
import { InstallerDashboard } from "@/components/installer/InstallerDashboard";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/espace-installateur/inscription" element={<InstallerSignup />} />
      <Route path="/espace-installateur" element={<InstallerDashboard />} />
    </Routes>
  );
};