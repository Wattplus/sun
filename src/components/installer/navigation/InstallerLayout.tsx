import { Outlet } from "react-router-dom"
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
  User,
  Menu,
  Building2,
  CreditCard,
  Home
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { InstallerBreadcrumb } from "./InstallerBreadcrumb"

const navigation = [
  { 
    name: "Tableau de bord", 
    href: "/espace-installateur", 
    icon: LayoutDashboard,
    description: "Vue d'ensemble de votre activité"
  },
  { 
    name: "Nouveaux leads", 
    href: "/espace-installateur/leads/nouveaux", 
    icon: UserPlus,
    description: "Découvrez de nouveaux prospects"
  },
  { 
    name: "Leads achetés", 
    href: "/espace-installateur/leads/achetes", 
    icon: ShoppingCart,
    description: "Gérez vos leads acquis"
  },
  { 
    name: "Messages", 
    href: "/espace-installateur/messages", 
    icon: MessageSquare,
    description: "Vos conversations"
  },
  { 
    name: "Documents", 
    href: "/espace-installateur/documents", 
    icon: FileText,
    description: "Vos fichiers et documents"
  },
  { 
    name: "Paramètres", 
    href: "/espace-installateur/parametres", 
    icon: Settings,
    description: "Configuration du compte"
  },
  { 
    name: "Notifications", 
    href: "/espace-installateur/notifications", 
    icon: Bell,
    description: "Centre de notifications"
  },
  { 
    name: "Mon profil", 
    href: "/espace-installateur/mon-compte", 
    icon: User,
    description: "Gérez votre profil"
  },
];

export function InstallerLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <Link to="/espace-installateur" className="text-xl font-bold hover:text-primary transition-colors hidden sm:block">
                Espace Installateur
              </Link>
            </div>

            {/* Menu mobile */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[80vw] sm:w-[385px]">
                  <div className="flex flex-col gap-4 py-4">
                    {navigation.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
                            isActive 
                              ? "bg-primary text-primary-foreground" 
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <div className="flex flex-col">
                            <span>{item.name}</span>
                            <span className="text-xs text-muted-foreground">{item.description}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Menu desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors group relative",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                    {/* Tooltip */}
                    <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-background border rounded shadow-lg whitespace-nowrap">
                      {item.description}
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <InstallerBreadcrumb />
        <Outlet />
      </main>
    </div>
  );
}