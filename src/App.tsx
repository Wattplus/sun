import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Admin from "@/pages/Admin";
import ClientPortal from "@/pages/ClientPortal";
import InstallerProfile from "@/pages/InstallerProfile";
import { PurchasedLeadsPage } from "@/components/installer/leads/PurchasedLeadsPage";
import { NewLeadsPage } from "@/components/installer/marketplace/NewLeadsPage";
import { SubscriptionPlans } from "@/components/installer/subscription/SubscriptionPlans";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/espace-client/*" element={<ClientPortal />} />
          <Route path="/espace-installateur" element={<InstallerProfile />} />
          <Route path="/espace-installateur/leads" element={<PurchasedLeadsPage />} />
          <Route path="/espace-installateur/marketplace/nouveaux-leads" element={<NewLeadsPage />} />
          <Route path="/espace-installateur/abonnement" element={<SubscriptionPlans />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;