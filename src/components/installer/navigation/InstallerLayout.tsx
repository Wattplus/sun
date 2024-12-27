import { ReactNode } from "react"

interface InstallerLayoutProps {
  children: ReactNode;
}

export function InstallerLayout({ children }: InstallerLayoutProps) {
  return (
    <div className="min-h-screen w-full">
      <main className="flex-1 relative">
        <div className="p-2 sm:p-4">
          {children}
        </div>
      </main>
    </div>
  )
}