import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Index } from "./pages/Index";
import { InstallerLayout } from "./components/installer/navigation/InstallerLayout";
import { AccountPage } from "./pages/installer/account/AccountPage";
import { NewCardPage } from "./pages/installer/payment/NewCardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/espace-installateur" element={<InstallerLayout>
          <Routes>
            <Route path="compte" element={<AccountPage />} />
            <Route path="paiement/nouvelle-carte" element={<NewCardPage />} />
          </Routes>
        </InstallerLayout>} />
      </Routes>
    </Router>
  );
}

export default App;