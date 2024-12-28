import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Index } from "@/pages/Index";
import ClientPortal from "@/pages/ClientPortal";
import { InstallerProfile } from "@/components/client/directory/InstallerProfile";
import { InstallerDirectory } from "@/components/client/directory/InstallerDirectory";
import { Toaster } from "@/components/ui/sonner";
import { InstallerDashboard } from "@/components/installer/InstallerDashboard";
import { InstallerLayout } from "@/components/installer/navigation/InstallerLayout";
import { AccountPage } from "@/components/installer/account/AccountPage";
import { MessagesPage } from "@/components/installer/messages/MessagesPage";
import { SettingsPage } from "@/components/installer/settings/SettingsPage";
import { ProfilePage } from "@/components/installer/profile/ProfilePage";
import { AllAvailableLeads } from "@/components/installer/dashboard/leads/AllAvailableLeads";
import { AllPurchasedLeads } from "@/components/installer/dashboard/leads/AllPurchasedLeads";
import { mockAvailableLeads } from "@/components/installer/dashboard/mockAvailableLeads";
import { mockPurchasedLeads } from "@/components/installer/dashboard/mockPurchasedLeads";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/espace-installateur");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/client/*" element={<ClientPortal />} />
        <Route path="/directory" element={<InstallerDirectory />} />
        <Route path="/directory/:id" element={<InstallerProfile />} />
        <Route path="/espace-installateur" element={<InstallerLayout />}>
          <Route index element={<InstallerDashboard />} />
          <Route 
            path="leads/nouveaux" 
            element={<AllAvailableLeads leads={mockAvailableLeads} onClose={handleClose} />} 
          />
          <Route 
            path="leads/achetes" 
            element={<AllPurchasedLeads leads={mockPurchasedLeads} onClose={handleClose} />} 
          />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="rapports" element={<ProfilePage />} />
          <Route path="parametres" element={<SettingsPage />} />
          <Route path="notifications" element={<ProfilePage />} />
          <Route path="mon-compte" element={<AccountPage />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;