import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import ThankYou from "./pages/ThankYou";
import InstallerSignup from "./pages/installer/InstallerSignup";
import { InstallerDashboard } from "@/components/installer/InstallerDashboard";
import { InstallerLayout } from "@/components/installer/navigation/InstallerLayout";
import { AccountPage } from "@/components/installer/account/AccountPage";
import { ProfilePage } from "@/components/installer/profile/ProfilePage";
import { MessagesList } from "@/components/installer/messages/MessagesList";
import { LeadsList } from "@/components/installer/dashboard/LeadsList";
import { PurchasedLeads } from "@/components/installer/dashboard/PurchasedLeads";
import { NotificationsList } from "@/components/installer/dashboard/NotificationsList";
import { SettingsPage } from "@/components/installer/settings/SettingsPage";
import LeadManagement from "@/components/admin/LeadManagement";
import InstallerManagement from "@/components/admin/InstallerManagement";
import ComplaintManagement from "@/components/admin/complaints/ComplaintManagement";
import DataExport from "@/components/admin/export/DataExport";
import NotificationsPage from "@/components/admin/notifications/NotificationsPage";
import PricingSettings from "@/components/admin/pricing/PricingSettings";
import AdminProfilePage from "@/components/admin/profile/ProfilePage";
import AdminSettingsPage from "@/components/admin/settings/SettingsPage";
import StatisticsPage from "@/components/admin/statistics/StatisticsPage";
import TransactionMonitoring from "@/components/admin/transactions/TransactionMonitoring";
import UserManagement from "@/components/admin/users/UserManagement";
import { LeadMarketplace } from "@/components/admin/marketplace/LeadMarketplace";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="leads" element={<LeadManagement />} />
        <Route path="installers" element={<InstallerManagement />} />
        <Route path="marketplace" element={<LeadMarketplace />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="pricing" element={<PricingSettings />} />
        <Route path="transactions" element={<TransactionMonitoring />} />
        <Route path="complaints" element={<ComplaintManagement />} />
        <Route path="export" element={<DataExport />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route path="profile" element={<AdminProfilePage />} />
        <Route path="statistics" element={<StatisticsPage />} />
      </Route>
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/espace-installateur/inscription" element={<InstallerSignup />} />
      <Route path="/espace-installateur" element={<InstallerLayout />}>
        <Route index element={<InstallerDashboard />} />
        <Route path="leads/nouveaux" element={<LeadsList />} />
        <Route path="leads/achetes" element={<PurchasedLeads />} />
        <Route path="messages" element={<MessagesList />} />
        <Route path="notifications" element={<NotificationsList />} />
        <Route path="profil" element={<ProfilePage />} />
        <Route path="compte" element={<AccountPage />} />
        <Route path="parametres" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};