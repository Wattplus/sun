import { Routes, Route } from "react-router-dom";
import { Login } from "@/pages/Login";
import { CreateSuperAdmin } from "@/pages/CreateSuperAdmin";
import { PrivateRoute } from "@/components/PrivateRoute";
import { Dashboard } from "@/pages/Dashboard";
import { Profile } from "@/pages/Profile";
import { Settings } from "@/pages/Settings";
import { NotFound } from "@/pages/NotFound";
import { Index } from "@/pages/Index";
import AdminDashboard from "@/components/admin/AdminDashboard";
import StatisticsPage from "@/components/admin/statistics/StatisticsPage";
import { LeadManagement } from "@/components/admin/LeadManagement";
import InstallerManagement from "@/components/admin/InstallerManagement";
import { LeadMarketplace } from "@/components/admin/marketplace/LeadMarketplace";
import NotificationsPage from "@/components/admin/notifications/NotificationsPage";
import AdminProfilePage from "@/components/admin/profile/ProfilePage";
import SettingsPage from "@/components/admin/settings/SettingsPage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<Login isAdminLogin={true} />} />
      <Route path="/create-super-admin" element={<CreateSuperAdmin />} />
      
      {/* Protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/statistics" element={<StatisticsPage />} />
        <Route path="/admin/leads" element={<LeadManagement />} />
        <Route path="/admin/installers" element={<InstallerManagement />} />
        <Route path="/admin/marketplace" element={<LeadMarketplace />} />
        <Route path="/admin/notifications" element={<NotificationsPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="/admin/profile" element={<AdminProfilePage />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};