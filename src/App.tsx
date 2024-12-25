import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { InstallerDashboard } from "./components/installer/InstallerDashboard";
import { ProjectDetails } from "./components/installer/projects/ProjectDetails";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { InstallerManagement } from "./components/admin/InstallerManagement";
import { LeadManagement } from "./components/admin/LeadManagement";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { ForgotPassword } from "./components/auth/ForgotPassword";
import { ResetPassword } from "./components/auth/ResetPassword";
import { NotFound } from "./components/NotFound";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Installer routes */}
        <Route path="/espace-installateur" element={
          <PrivateRoute role="installer">
            <InstallerDashboard />
          </PrivateRoute>
        } />
        <Route path="/espace-installateur/projets/:projectId" element={
          <PrivateRoute role="installer">
            <ProjectDetails />
          </PrivateRoute>
        } />

        {/* Admin routes */}
        <Route path="/admin" element={
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        } />
        <Route path="/admin/installateurs" element={
          <PrivateRoute role="admin">
            <InstallerManagement />
          </PrivateRoute>
        } />
        <Route path="/admin/leads" element={
          <PrivateRoute role="admin">
            <LeadManagement />
          </PrivateRoute>
        } />

        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;