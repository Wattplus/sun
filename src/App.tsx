import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import ClientPortal from "./pages/ClientPortal";
import InstallerProfile from "./pages/InstallerProfile";
import { NewLeadsPage } from "./components/installer/marketplace/NewLeadsPage";
import { MarketplacePage } from "./components/installer/marketplace/MarketplacePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/espace-client/*" element={<ClientPortal />} />
          <Route path="/espace-installateur/*" element={<InstallerProfile />}>
            <Route path="marketplace" element={<MarketplacePage />} />
            <Route path="marketplace/nouveaux-leads" element={<NewLeadsPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;