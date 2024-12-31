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
  Menu,
  User,
  CreditCard
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

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
    name: "Mon compte",
    href: "/espace-installateur/compte",
    icon: CreditCard
  },
  {
    name: "Mon profil",
    href: "/espace-installateur/profil",
    icon: User
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
  }
];

export function InstallerLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto">
          <nav className="flex items-center justify-between h-16">
            {/* Logo ou titre */}
            <div className="flex items-center">
              <Link to="/espace-installateur" className="text-xl font-bold hover:text-primary transition-colors">
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
                            "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                            isActive 
                              ? "bg-primary text-primary-foreground" 
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.name}
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
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}