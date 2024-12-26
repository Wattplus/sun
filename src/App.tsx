import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Index } from './pages/Index';
import Admin from './pages/Admin';
import ClientPortal from './pages/ClientPortal';
import InstallerProfile from './pages/InstallerProfile';
import { MarketplacePage } from './components/installer/marketplace/MarketplacePage';
import { NewLeadsPage } from './components/installer/marketplace/NewLeadsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/espace-client/*" element={<ClientPortal />} />
        <Route path="/installateur/:id" element={<InstallerProfile />} />
        <Route path="/espace-installateur/marketplace" element={<MarketplacePage />} />
        <Route path="/espace-installateur/marketplace/nouveaux-leads" element={<NewLeadsPage />} />
      </Routes>
    </Router>
  );
}

export default App;