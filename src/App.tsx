import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import ClientPortal from "./pages/ClientPortal";
import InstallerProfile from "./pages/InstallerProfile";
import { NewLeadsPage } from "./components/installer/marketplace/NewLeadsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/espace-client/*" element={<ClientPortal />} />
        <Route path="/espace-installateur/*" element={<InstallerProfile />}>
          <Route path="marketplace/nouveaux-leads" element={<NewLeadsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;