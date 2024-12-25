import { Outlet, useLocation } from "react-router-dom";
import { InstallerDashboard } from "@/components/installer/InstallerDashboard";

const InstallerProfile = () => {
  const location = useLocation();
  const isMarketplace = location.pathname.includes('/marketplace');

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background">
      <Outlet />
      {!isMarketplace && <InstallerDashboard />}
    </div>
  );
};

export default InstallerProfile;