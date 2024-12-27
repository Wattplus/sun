import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Index } from "@/pages/Index";
import ClientPortal from "@/pages/ClientPortal";
import Admin from "@/pages/Admin";
import { InstallerDashboard } from "@/components/installer/InstallerDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NewLeadsPage } from "@/components/installer/marketplace/NewLeadsPage";
import { PurchasedLeadsPage } from "@/components/installer/leads/PurchasedLeadsPage";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/client/*" element={<ClientPortal />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/espace-installateur" element={<InstallerDashboard />}>
            <Route path="leads/nouveaux" element={<NewLeadsPage />} />
            <Route path="leads/achetes" element={<PurchasedLeadsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;