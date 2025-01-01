import { Bell, LayoutDashboard, UserPlus, ShoppingCart, MessageSquare, User, Settings, Menu, X } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navigation = [
  { 
    name: "Tableau de bord",
    href: "/espace-installateur",
    icon: LayoutDashboard
  },
  {
    name: "Nouveaux leads",
    href: "/espace-installateur/marketplace",
    icon: UserPlus
  },
  {
    name: "Leads achetés",
    href: "/espace-installateur/leads",
    icon: ShoppingCart
  },
  {
    name: "Messages",
    href: "/espace-installateur/messages",
    icon: MessageSquare
  },
  {
    name: "Mon compte",
    href: "/espace-installateur/mon-compte",
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto">
          <div className="flex h-14 items-center justify-between md:justify-center px-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium transition-colors",
                      location.pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={() => setIsMenuOpen(false)} 
          />
          <nav className="fixed inset-y-0 left-0 w-64 bg-background/95 backdrop-blur-lg border-r border-primary/10 px-4 py-6 overflow-y-auto">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      location.pathname === item.href
                        ? "bg-primary text-white"
                        : "text-muted-foreground hover:bg-primary/10 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-6">
        <Outlet />
      </main>
    </div>
  );
}