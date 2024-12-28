import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Index } from "@/pages/Index";
import Admin from "@/pages/Admin";
import ClientPortal from "@/pages/ClientPortal";
import { InstallerProfile } from "@/components/client/directory/InstallerProfile";
import { InstallerDirectory } from "@/components/client/directory/InstallerDirectory";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/client/*" element={<ClientPortal />} />
        <Route path="/directory" element={<InstallerDirectory />} />
        <Route path="/directory/:id" element={<InstallerProfile />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;