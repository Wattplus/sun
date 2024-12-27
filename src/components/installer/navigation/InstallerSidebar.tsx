import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  MessageSquare,
  Crown,
  Users,
  FileText,
  Settings,
  Bell,
  Menu,
  UserPlus,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  {
    name: "Tableau de bord",
    href: "/espace-installateur",
    icon: LayoutDashboard,
  },
  {
    name: "Nouveau lead",
    href: "/espace-installateur/nouveau-lead",
    icon: UserPlus,
  },
  {
    name: "Messages",
    href: "/espace-installateur/messages",
    icon: MessageSquare,
  },
  {
    name: "Abonnement",
    href: "/espace-installateur/abonnement",
    icon: Crown,
  },
  {
    name: "Leads",
    href: "/espace-installateur/leads",
    icon: Users,
  },
  {
    name: "Documents",
    href: "/espace-installateur/documents",
    icon: FileText,
  },
  {
    name: "Paramètres",
    href: "/espace-installateur/parametres",
    icon: Settings,
  },
  {
    name: "Notifications",
    href: "/espace-installateur/notifications",
    icon: Bell,
  },
];

export const InstallerSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent className="flex h-full flex-col bg-gradient-to-b from-background to-primary/20">
        <div className="flex h-24 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <Menu className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-white">Espace Pro</span>
          </div>
          <SidebarTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10"
            >
              <ChevronLeft className="h-5 w-5 text-primary" />
            </Button>
          </SidebarTrigger>
        </div>
        <nav className="flex-1 space-y-2 px-4 py-6">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center rounded-lg px-4 py-3 text-base font-medium transition-all duration-200 hover:scale-105",
                  isActive
                    ? "bg-primary text-white shadow-lg"
                    : "text-white/90 hover:bg-primary/10 hover:text-white"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-4 h-6 w-6",
                    isActive ? "text-white" : "text-primary group-hover:text-white"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </SidebarContent>
    </Sidebar>
  );
};