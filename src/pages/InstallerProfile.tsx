import { Outlet } from "react-router-dom";
import { InstallerDashboard } from "@/components/installer/InstallerDashboard";

const InstallerProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background">
      <Outlet />
      <InstallerDashboard />
    </div>
  );
};

export default InstallerProfile;