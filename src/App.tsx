```tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { InstallerDashboard } from "./components/installer/InstallerDashboard";
import { InstallerProfile } from "./pages/InstallerProfile";
import { AccountPage } from "./pages/installer/account/AccountPage";
import { ProfileSection } from "./pages/installer/account/ProfileSection";
import { PaymentMethodsSection } from "./pages/installer/account/PaymentMethodsSection"; 
import { PrepaidSection } from "./pages/installer/account/PrepaidSection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/espace-installateur" replace />} />
        
        <Route path="/espace-installateur" element={<InstallerProfile />}>
          <Route index element={<InstallerDashboard />} />
          
          <Route path="mon-compte" element={<AccountPage />}>
            <Route index element={<Navigate to="profil" replace />} />
            <Route path="profil" element={<ProfileSection />} />
            <Route path="paiement" element={<PaymentMethodsSection />} />
            <Route path="prepaye" element={<PrepaidSection />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
```