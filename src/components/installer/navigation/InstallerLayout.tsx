import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { InstallerSidebar } from "./InstallerSidebar"
import { ReactNode } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

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
            <Button
              variant="outline"
              size="default"
              className="hover:bg-primary/10 gap-2"
              asChild
            >
              <SidebarTrigger>
                <Menu className="h-5 w-5" />
                <span>Menu principal</span>
              </SidebarTrigger>
            </Button>
          </div>
          <div className="p-4">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}