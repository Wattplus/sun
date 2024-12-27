import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Admin from "@/pages/Admin";
import ClientPortal from "@/pages/ClientPortal";
import InstallerProfile from "@/pages/InstallerProfile";
import { PurchasedLeadsPage } from "@/components/installer/leads/PurchasedLeadsPage";

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
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;