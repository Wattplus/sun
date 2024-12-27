import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  UserPlus, 
  ShoppingCart, 
  MessageSquare, 
  FileText, 
  Settings, 
  Bell, 
  User 
} from "lucide-react"

const navigation = [
  { 
    name: "Tableau de bord", 
    href: "/espace-installateur", 
    icon: LayoutDashboard 
  },
  { 
    name: "Nouveaux leads", 
    href: "/espace-installateur/leads/nouveaux", 
    icon: UserPlus 
  },
  { 
    name: "Leads achetés", 
    href: "/espace-installateur/leads/achetes", 
    icon: ShoppingCart 
  },
  { 
    name: "Messages", 
    href: "/espace-installateur/messages", 
    icon: MessageSquare 
  },
  { 
    name: "Rapports", 
    href: "/espace-installateur/rapports", 
    icon: FileText 
  },
  { 
    name: "Paramètres", 
    href: "/espace-installateur/parametres", 
    icon: Settings 
  },
  { 
    name: "Notifications", 
    href: "/espace-installateur/notifications", 
    icon: Bell 
  },
  { 
    name: "Mon profil", 
    href: "/espace-installateur/profil", 
    icon: User 
  },
];

interface InstallerLayoutProps {
  children: ReactNode;
}

export function InstallerLayout({ children }: InstallerLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex h-screen w-64 flex-col fixed left-0 top-0 bottom-0 bg-background border-r border-border">
        <div className="flex flex-col flex-1 p-4">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background z-50">
        <nav className="flex justify-around p-2">
          {navigation.slice(0, 4).map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 text-xs rounded-md transition-colors",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        <div className="p-2 sm:p-4">
          {children}
        </div>
      </main>
    </div>
  );
}