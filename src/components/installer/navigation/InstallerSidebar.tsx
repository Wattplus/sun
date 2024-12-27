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
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/espace-installateur", icon: LayoutDashboard },
  { name: "Nouveaux Leads", href: "/espace-installateur/leads/nouveaux", icon: UserPlus },
  { name: "Leads Achetés", href: "/espace-installateur/leads/achetes", icon: ShoppingCart },
  { name: "Messages", href: "/espace-installateur/messages", icon: MessageSquare },
  { name: "Rapports", href: "/espace-installateur/rapports", icon: FileText },
  { name: "Notifications", href: "/espace-installateur/notifications", icon: Bell },
  { name: "Paramètres", href: "/espace-installateur/parametres", icon: Settings },
];

export function InstallerSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-primary/10">
      <SidebarContent>
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="mt-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-primary hover:bg-primary/10",
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto p-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 bg-primary/5 hover:bg-primary/10"
          >
            <LogOut className="h-4 w-4" />
            <span>Déconnexion</span>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}