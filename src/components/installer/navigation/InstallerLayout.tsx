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
    <div className="min-h-screen w-full flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
        <div className="container mx-auto">
          <nav className="flex items-center justify-between h-16">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
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
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center justify-around w-full">
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
            </div>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="container mx-auto p-4">
          {children}
        </div>
      </main>
    </div>
  );
}