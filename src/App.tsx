import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import { InstallerLayout } from "./components/installer/navigation/InstallerLayout";
import { InstallerDashboard } from "./components/installer/InstallerDashboard";
import { MessagesPage } from "./components/installer/messages/MessagesPage";
import { SettingsPage } from "./components/installer/settings/SettingsPage";
import { ClientsPage } from "./components/installer/clients/ClientsPage";
import { HelpPage } from "./components/installer/help/HelpPage";
import Admin from "./pages/Admin";
import ClientPortal from "./pages/ClientPortal";
import { PurchasedLeadsPage } from "./components/installer/leads/PurchasedLeadsPage";
import { LeadDetailsPage } from "./components/installer/leads/LeadDetailsPage";
import { NewLeadsPage } from "./components/installer/marketplace/NewLeadsPage";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/espace-installateur" element={<InstallerLayout />}>
            <Route index element={<InstallerDashboard />} />
            <Route path="leads" element={<PurchasedLeadsPage />} />
            <Route path="leads/:id" element={<LeadDetailsPage />} />
            <Route path="marketplace/nouveaux-leads" element={<NewLeadsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="parametres" element={<SettingsPage />} />
            <Route path="aide" element={<HelpPage />} />
          </Route>
          <Route path="/espace-admin/*" element={<Admin />} />
          <Route path="/espace-client/*" element={<ClientPortal />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;