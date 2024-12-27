import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Index } from "@/pages/Index";
import ClientPortal from "@/pages/ClientPortal";
import Admin from "@/pages/Admin";
import { InstallerDashboard } from "@/components/installer/InstallerDashboard";
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
          <Route path="/dashboard/*" element={<InstallerDashboard />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;