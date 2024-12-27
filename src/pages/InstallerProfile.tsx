import { Outlet } from "react-router-dom";
import { InstallerLayout } from "@/components/installer/navigation/InstallerLayout";

export const InstallerProfile = () => {
  return (
    <InstallerLayout>
      <Outlet />
    </InstallerLayout>
  );
};