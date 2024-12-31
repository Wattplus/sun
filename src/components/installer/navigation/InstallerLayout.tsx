import { Outlet, Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Inbox,
  UserCircle,
  Settings,
  Bell,
  Users,
  Wallet,
  MessageSquare
} from "lucide-react";

export const InstallerLayout = () => {
  const location = useLocation();
  
  const navigation = [
    {
      name: "Tableau de bord",
      href: "/espace-installateur",
      icon: LayoutDashboard,
      exact: true
    },
    {
      name: "Nouveaux leads",
      href: "/espace-installateur/leads/nouveaux",
      icon: Users
    },
    {
      name: "Leads achetés",
      href: "/espace-installateur/leads/achetes",
      icon: Wallet
    },
    {
      name: "Messages",
      href: "/espace-installateur/messages",
      icon: MessageSquare
    },
    {
      name: "Mon compte",
      href: "/espace-installateur/compte",
      icon: Inbox
    },
    {
      name: "Mon profil",
      href: "/espace-installateur/profil",
      icon: UserCircle
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

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-primary/10 bg-background/50 backdrop-blur-xl px-6">
          <div className="flex flex-shrink-0 items-center px-4 py-8">
            <Link to="/espace-installateur" className="text-xl font-bold text-white">
              Espace Installateur
            </Link>
          </div>
          <div className="mt-5 flex flex-grow flex-col">
            <nav className="flex-1 space-y-2">
              {navigation.map((item) => {
                const isActive = item.exact 
                  ? location.pathname === item.href
                  : location.pathname.startsWith(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "group flex items-center px-4 py-2 text-sm font-medium rounded-lg",
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-300 hover:bg-primary/10 hover:text-white"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0",
                        isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      {/* Mobile navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t border-primary/10 flex overflow-x-auto md:hidden">
        {navigation.map((item) => {
          const isActive = item.exact 
            ? location.pathname === item.href
            : location.pathname.startsWith(item.href);
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center py-4 min-w-0 text-xs font-medium",
                isActive
                  ? "text-primary"
                  : "text-gray-400 hover:text-white"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-primary" : "text-gray-400"
                )}
              />
              <span className="mt-1 truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};