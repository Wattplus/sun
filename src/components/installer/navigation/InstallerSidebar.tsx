import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  UserPlus,
  FileText,
  Bell,
  ShoppingCart,
  LogOut,
  User,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { 
    name: "Dashboard", 
    href: "/espace-installateur", 
    icon: LayoutDashboard 
  },
  { 
    name: "Leads", 
    href: "/espace-installateur/leads/nouveaux", 
    icon: UserPlus,
    subItems: [
      { 
        name: "Nouveaux", 
        href: "/espace-installateur/leads/nouveaux", 
        icon: UserPlus 
      },
      { 
        name: "Achetés", 
        href: "/espace-installateur/leads/achetes", 
        icon: ShoppingCart 
      },
    ]
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
    name: "Notifications", 
    href: "/espace-installateur/notifications", 
    icon: Bell 
  },
  { 
    name: "Mon Compte", 
    href: "/espace-installateur/mon-compte", 
    icon: User,
    subItems: [
      { 
        name: "Profil", 
        href: "/espace-installateur/mon-compte/profil", 
        icon: User 
      },
      { 
        name: "Compte prépayé", 
        href: "/espace-installateur/mon-compte/prepaye", 
        icon: Wallet 
      },
    ]
  },
  { 
    name: "Paramètres", 
    href: "/espace-installateur/parametres", 
    icon: Settings 
  },
];

export function InstallerSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-primary/10">
      <SidebarContent>
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="text-lg font-semibold text-white px-3 mb-4">Installateur</h2>
            <div className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      location.pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-white hover:bg-primary/10",
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                  
                  {item.subItems && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className={cn(
                            location.pathname === subItem.href
                              ? "bg-primary text-primary-foreground"
                              : "text-white hover:bg-primary/10",
                            "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
                          )}
                        >
                          <subItem.icon className="mr-3 h-4 w-4" />
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto p-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 bg-primary/5 hover:bg-primary/10 text-white"
          >
            <LogOut className="h-4 w-4" />
            <span>Déconnexion</span>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}