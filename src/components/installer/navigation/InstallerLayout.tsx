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
        <main className="flex-1 overflow-y-auto">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 left-6 z-50 hover:bg-primary/10"
            asChild
          >
            <SidebarTrigger>
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
          </Button>
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}