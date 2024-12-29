import { Routes, Route, useNavigate } from "react-router-dom";
import { Index } from "@/pages/Index";
import { InstallerDashboard } from "@/components/installer/InstallerDashboard";
import { InstallerLayout } from "@/components/installer/navigation/InstallerLayout";
import { AccountPage } from "@/components/installer/account/AccountPage";
import { MessagesPage } from "@/components/installer/messages/MessagesPage";
import { ConversationPage } from "@/components/installer/messages/ConversationPage";
import { SettingsPage } from "@/components/installer/settings/SettingsPage";
import { ProfilePage } from "@/components/installer/profile/ProfilePage";
import { AllAvailableLeads } from "@/components/installer/dashboard/leads/AllAvailableLeads";
import { AllPurchasedLeads } from "@/components/installer/dashboard/leads/AllPurchasedLeads";
import NotificationsPage from "@/components/admin/notifications/NotificationsPage";
import AdminDashboard from "@/components/admin/AdminDashboard";
import Admin from "@/pages/Admin";
import StatisticsPage from "@/components/admin/statistics/StatisticsPage";
import LeadManagement from "@/components/admin/LeadManagement";
import InstallerManagement from "@/components/admin/InstallerManagement";
import { LeadMarketplace } from "@/components/admin/marketplace/LeadMarketplace";
import AdminSettingsPage from "@/components/admin/settings/SettingsPage";
import AdminProfilePage from "@/components/admin/profile/ProfilePage";
import { ThankYou } from "@/pages/ThankYou";
import UserManagement from "@/components/admin/users/UserManagement";
import PricingSettings from "@/components/admin/pricing/PricingSettings";
import TransactionMonitoring from "@/components/admin/transactions/TransactionMonitoring";
import ComplaintManagement from "@/components/admin/complaints/ComplaintManagement";
import DataExport from "@/components/admin/export/DataExport";
import Login from "@/pages/Login";

export function AppRoutes() {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/espace-installateur");
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/admin" element={<Admin />}>
        <Route index element={<AdminDashboard />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="leads" element={<LeadManagement />} />
        <Route path="installers" element={<InstallerManagement />} />
        <Route path="marketplace" element={<LeadMarketplace />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route path="profile" element={<AdminProfilePage />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="pricing" element={<PricingSettings />} />
        <Route path="transactions" element={<TransactionMonitoring />} />
        <Route path="complaints" element={<ComplaintManagement />} />
        <Route path="export" element={<DataExport />} />
      </Route>

      <Route path="/" element={<Index />} />
      <Route path="/thank-you" element={<ThankYou />} />
      
      <Route path="/espace-installateur" element={<InstallerLayout />}>
        <Route index element={<InstallerDashboard />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="messages/:id" element={<ConversationPage />} />
        <Route 
          path="leads/nouveaux" 
          element={<AllAvailableLeads onClose={handleClose} />} 
        />
        <Route 
          path="leads/achetes" 
          element={<AllPurchasedLeads onClose={handleClose} />} 
        />
        <Route path="rapports" element={<ProfilePage />} />
        <Route path="parametres" element={<SettingsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="mon-compte" element={<AccountPage />} />
      </Route>
    </Routes>
  );
}