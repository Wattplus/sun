import { Bell, LayoutDashboard, UserPlus, ShoppingCart, MessageSquare, User, Settings } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

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

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto">
          <div className="flex h-14 items-center justify-center">
            <nav className="flex items-center space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-6">
        <Outlet />
      </main>
    </div>
  );
}