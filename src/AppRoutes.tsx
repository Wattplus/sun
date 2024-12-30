import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase-client";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Admin from "@/pages/Admin";
import { ThankYou } from "@/pages/ThankYou";
import ClientPortal from "@/pages/ClientPortal";
import { InstallerProfile } from "@/pages/InstallerProfile";

// Admin Components
import AdminDashboard from "@/components/admin/AdminDashboard";
import LeadManagement from "@/components/admin/LeadManagement";
import InstallerManagement from "@/components/admin/InstallerManagement";
import UserManagement from "@/components/admin/users/UserManagement";
import StatisticsPage from "@/components/admin/statistics/StatisticsPage";
import NotificationsPage from "@/components/admin/notifications/NotificationsPage";
import SettingsPage from "@/components/admin/settings/SettingsPage";
import PricingSettings from "@/components/admin/pricing/PricingSettings";
import TransactionMonitoring from "@/components/admin/transactions/TransactionMonitoring";
import ComplaintManagement from "@/components/admin/complaints/ComplaintManagement";
import DataExport from "@/components/admin/export/DataExport";

export function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("AppRoutes: Auth state changed:", event, session?.user?.id);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/client" element={<ClientPortal />} />
      <Route path="/espace-installateur" element={<InstallerProfile />} />
      
      <Route path="/admin" element={<Admin />}>
        <Route index element={<AdminDashboard />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="leads" element={<LeadManagement />} />
        <Route path="installers" element={<InstallerManagement />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="pricing" element={<PricingSettings />} />
        <Route path="transactions" element={<TransactionMonitoring />} />
        <Route path="complaints" element={<ComplaintManagement />} />
        <Route path="export" element={<DataExport />} />
      </Route>

      <Route path="*" element={<Index />} />
    </Routes>
  );
}