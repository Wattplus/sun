import { SidebarProvider } from "@/components/ui/sidebar"
import { InstallerSidebar } from "./InstallerSidebar"
import { ReactNode } from "react"
import { DashboardControls } from "../dashboard/header/DashboardControls"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState } from "react"

interface InstallerLayoutProps {
  children: ReactNode;
}

export function InstallerLayout({ children }: InstallerLayoutProps) {
  const isMobile = useIsMobile();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error("Erreur lors du changement de mode plein écran:", err);
    }
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full">
        <InstallerSidebar />
        <main className="flex-1 relative">
          <div className="sticky top-0 z-50 mb-4">
            <DashboardControls 
              isFullscreen={isFullscreen} 
              toggleFullscreen={toggleFullscreen} 
            />
          </div>
          <div className="p-2 sm:p-4">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}