import { SidebarProvider } from "@/components/ui/sidebar"
import { InstallerSidebar } from "./InstallerSidebar"
import { ReactNode } from "react"

interface InstallerLayoutProps {
  children: ReactNode;
}

export function InstallerLayout({ children }: InstallerLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full">
        <InstallerSidebar />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}