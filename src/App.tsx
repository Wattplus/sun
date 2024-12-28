import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InstallerLayout } from "./components/installer/navigation/InstallerLayout";
import { AccountPage } from "./pages/installer/account/AccountPage";
import { NewCardPage } from "./pages/installer/payment/NewCardPage";
import { InstallerDashboard } from "./components/installer/InstallerDashboard";
import { NewLeadsPage } from "./components/installer/marketplace/NewLeadsPage";
import { PurchasedLeadsPage } from "./components/installer/leads/PurchasedLeadsPage";
import { MessagesPage } from "./components/installer/messages/MessagesPage";
import StatisticsPage from "./components/admin/statistics/StatisticsPage";
import { SettingsPage } from "./components/installer/settings/SettingsPage";
import NotificationsPage from "./components/admin/notifications/NotificationsPage";
import { InstallerProfilePage } from "./pages/installer/profile/InstallerProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/espace-installateur/*"
          element={
            <InstallerLayout>
              <Routes>
                <Route path="/" element={<InstallerDashboard />} />
                <Route path="leads/nouveaux" element={<NewLeadsPage />} />
                <Route path="leads/achetes" element={<PurchasedLeadsPage />} />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="rapports" element={<StatisticsPage />} />
                <Route path="parametres" element={<SettingsPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="mon-compte" element={<InstallerProfilePage />} />
                <Route path="compte" element={<AccountPage />} />
                <Route path="paiement/nouvelle-carte" element={<NewCardPage />} />
              </Routes>
            </InstallerLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;