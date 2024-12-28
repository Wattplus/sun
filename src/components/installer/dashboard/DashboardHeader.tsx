import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";

export function DashboardHeader() {
  return (
    <header className="flex flex-col space-y-4">
      <InstallerBreadcrumb />
    </header>
  );
}