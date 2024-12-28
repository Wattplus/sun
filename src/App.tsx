import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { InstallerDashboard } from "./components/installer/InstallerDashboard";
import { InstallerProfile } from "./pages/InstallerProfile";
import { AccountPage } from "./pages/installer/account/AccountPage";
import { ProfileSection } from "./pages/installer/account/ProfileSection";
import { PrepaidSection } from "./pages/installer/account/PrepaidSection";
import { PurchasedLeadsPage } from "./components/installer/leads/PurchasedLeadsPage";
import { NewLeadsPage } from "./components/installer/marketplace/NewLeadsPage";
import { MessagesPage } from "./components/installer/messages/MessagesPage";
import { SettingsPage } from "./components/installer/settings/SettingsPage";

export function App() {
  return (
    <Router>
      <Routes>
        {/* Redirection de la racine vers le tableau de bord */}
        <Route path="/" element={<Navigate to="/espace-installateur" replace />} />
        
        {/* Routes de l'espace installateur */}
        <Route path="/espace-installateur" element={<InstallerProfile />}>
          <Route index element={<InstallerDashboard />} />
          
          {/* Routes pour les leads */}
          <Route path="leads">
            <Route path="nouveaux" element={<NewLeadsPage />} />
            <Route path="achetes" element={<PurchasedLeadsPage />} />
          </Route>

          {/* Route pour les messages */}
          <Route path="messages" element={<MessagesPage />} />

          {/* Route pour les rapports */}
          <Route path="rapports" element={<div>Rapports</div>} />

          {/* Route pour les notifications */}
          <Route path="notifications" element={<div>Notifications</div>} />
          
          {/* Routes pour le compte */}
          <Route path="mon-compte" element={<AccountPage />}>
            <Route index element={<Navigate to="profil" replace />} />
            <Route path="profil" element={<ProfileSection />} />
            <Route path="prepaye" element={<PrepaidSection />} />
          </Route>

          {/* Route pour les paramètres */}
          <Route path="parametres" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}