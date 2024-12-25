import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { InstallerDashboard } from "./components/installer/InstallerDashboard";
import { ProjectDetails } from "./components/installer/projects/ProjectDetails";
import AdminDashboard from "./components/admin/AdminDashboard";
import InstallerManagement from "./components/admin/InstallerManagement";
import LeadManagement from "./components/admin/LeadManagement";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        {/* Installer routes */}
        <Route path="/espace-installateur" element={<InstallerDashboard />} />
        <Route path="/espace-installateur/projets/:projectId" element={<ProjectDetails />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/installateurs" element={<InstallerManagement />} />
        <Route path="/admin/leads" element={<LeadManagement />} />

        {/* Fallback route */}
        <Route path="*" element={<div>Page non trouvée</div>} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;