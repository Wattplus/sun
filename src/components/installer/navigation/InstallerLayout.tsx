import { SidebarProvider } from "@/components/ui/sidebar"
import { InstallerSidebar } from "./InstallerSidebar"
import { ReactNode } from "react"
import { Zap } from "lucide-react"

interface InstallerLayoutProps {
  children: ReactNode;
}

export function InstallerLayout({ children }: InstallerLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full">
        <InstallerSidebar />
        <main className="flex-1 relative">
          <div className="sticky top-0 z-50 p-4 bg-background/80 backdrop-blur-sm border-b border-primary/10">
            <div className="flex items-center gap-1">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">Wattplus</span>
            </div>
          </div>
          <div className="p-4">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}