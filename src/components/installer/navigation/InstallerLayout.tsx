import { SidebarProvider } from "@/components/ui/sidebar"
import { InstallerSidebar } from "./InstallerSidebar"
import { ReactNode } from "react"
import { DashboardControls } from "../dashboard/header/DashboardControls"

interface InstallerLayoutProps {
  children: ReactNode;
}

export function InstallerLayout({ children }: InstallerLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full">
        <InstallerSidebar />
        <main className="flex-1 relative">
          <div className="p-4">
            <div className="mb-4">
              <DashboardControls isFullscreen={false} toggleFullscreen={() => {}} />
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}