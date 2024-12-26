import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InstallerProfile from "./pages/InstallerProfile";
import { InstallerDashboard } from "./components/installer/InstallerDashboard";
import { MessagesPage } from "./components/installer/messages/MessagesPage";
import { SettingsPage } from "./components/installer/settings/SettingsPage";
import { HelpPage } from "./components/installer/help/HelpPage";
import { ClientsPage } from "./components/installer/clients/ClientsPage";
import { PurchasedLeads } from "./components/installer/dashboard/PurchasedLeads";
import Admin from "./pages/Admin";
import ClientPortal from "./pages/ClientPortal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/espace-installateur" element={<InstallerDashboard />} />
        <Route path="/espace-installateur/leads" element={<PurchasedLeads />} />
        <Route path="/espace-installateur/messages" element={<MessagesPage />} />
        <Route path="/espace-installateur/clients" element={<ClientsPage />} />
        <Route path="/espace-installateur/parametres" element={<SettingsPage />} />
        <Route path="/espace-installateur/aide" element={<HelpPage />} />
        <Route path="/espace-admin/*" element={<Admin />} />
        <Route path="/espace-client/*" element={<ClientPortal />} />
      </Routes>
    </Router>
  );
}

export default App;