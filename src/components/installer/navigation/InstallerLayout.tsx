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
  MessageSquare,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const InstallerLayout = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
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
      {/* Desktop Sidebar */}
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

      {/* Mobile Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-background/95 backdrop-blur border-b border-primary/10">
          <Link to="/espace-installateur" className="text-lg font-bold text-white">
            Espace Installateur
          </Link>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full pt-12">
              <nav className="grid grid-cols-4 gap-4 px-2">
                {navigation.map((item) => {
                  const isActive = item.exact 
                    ? location.pathname === item.href
                    : location.pathname.startsWith(item.href);
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex flex-col items-center justify-center p-3 rounded-lg text-center",
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-300 hover:bg-primary/10 hover:text-white"
                      )}
                    >
                      <item.icon className={cn(
                        "h-6 w-6 mb-1",
                        isActive ? "text-white" : "text-gray-400"
                      )} />
                      <span className="text-xs font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
        <Outlet />
      </main>
    </div>
  );
};