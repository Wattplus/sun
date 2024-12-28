import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PurchasedLeadsPage } from "@/components/installer/leads/PurchasedLeadsPage";
import { MarketplacePage } from "@/components/installer/marketplace/MarketplacePage";
import { NewLeadsPage } from "@/components/installer/marketplace/NewLeadsPage";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/espace-installateur/leads" element={<PurchasedLeadsPage />} />
          <Route path="/espace-installateur/marketplace" element={<MarketplacePage />} />
          <Route path="/espace-installateur/marketplace/new" element={<NewLeadsPage />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}