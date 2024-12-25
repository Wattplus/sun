import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import ClientPortal from "./pages/ClientPortal";
import LeadManagement from "./components/admin/LeadManagement";
import InstallerManagement from "./components/admin/InstallerManagement";
import { LeadMarketplace } from "./components/admin/marketplace/LeadMarketplace";
import AdminDashboard from "./components/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/client/*" element={<ClientPortal />} />
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminDashboard />} />
            <Route path="leads" element={<LeadManagement />} />
            <Route path="installers" element={<InstallerManagement />} />
            <Route path="marketplace" element={<LeadMarketplace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;