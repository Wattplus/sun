import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Index } from "@/pages/Index";
import { InstallerDashboard } from "@/components/installer/InstallerDashboard";
import { MessagesPage } from "@/components/installer/messages/MessagesPage";
import { NewLeadsPage } from "@/components/installer/marketplace/NewLeadsPage";
import { PurchasedLeadsPage } from "@/components/installer/leads/PurchasedLeadsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/espace-installateur" element={<InstallerDashboard />} />
        <Route path="/espace-installateur/messages" element={<MessagesPage />} />
        <Route path="/espace-installateur/leads/nouveaux" element={<NewLeadsPage />} />
        <Route path="/espace-installateur/leads/achetes" element={<PurchasedLeadsPage />} />
      </Routes>
    </Router>
  );
}