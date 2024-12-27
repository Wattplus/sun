import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  MessageSquare,
  Crown,
  Users,
  FileText,
  Settings,
  Bell,
  Menu,
} from "lucide-react";

const navigation = [
  {
    name: "Tableau de bord",
    href: "/espace-installateur",
    icon: LayoutDashboard,
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
      <SidebarContent className="flex h-full flex-col bg-[#0A0A0A] text-white">
        <div className="flex h-16 items-center border-b border-white/10 px-6">
          <Menu className="h-6 w-6" />
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "text-white/90 hover:bg-primary/10 hover:text-white"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5",
                    isActive ? "text-white" : "text-white/90 group-hover:text-white"
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