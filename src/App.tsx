import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import ClientPortal from "./pages/ClientPortal";
import { InstallerProfile } from "./pages/InstallerProfile";
import { NewLeadsPage } from "./components/installer/marketplace/NewLeadsPage";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/espace-client/*" element={<ClientPortal />} />
        <Route path="/espace-installateur/*" element={<InstallerProfile />}>
          <Route path="nouveau-lead" element={<NewLeadsPage />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;