import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { InstallerLayout } from "./components/installer/navigation/InstallerLayout";
import { InstallerDashboard } from "./components/installer/InstallerDashboard";
import { MessagesPage } from "./components/installer/messages/MessagesPage";
import { SettingsPage } from "./components/installer/settings/SettingsPage";
import { HelpPage } from "./components/installer/help/HelpPage";
import { ClientsPage } from "./components/installer/clients/ClientsPage";
import { PurchasedLeadsPage } from "./components/installer/leads/PurchasedLeadsPage";
import Admin from "./pages/Admin";
import ClientPortal from "./pages/ClientPortal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/espace-installateur" element={<InstallerLayout />}>
          <Route index element={<InstallerDashboard />} />
          <Route path="leads" element={<PurchasedLeadsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="parametres" element={<SettingsPage />} />
          <Route path="aide" element={<HelpPage />} />
        </Route>
        <Route path="/espace-admin/*" element={<Admin />} />
        <Route path="/espace-client/*" element={<ClientPortal />} />
      </Routes>
    </Router>
  );
}

export default App;