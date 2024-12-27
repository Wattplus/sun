import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  MessageSquare,
  UserCircle,
  Crown,
  Users,
  FileText,
  Settings,
  Bell,
} from "lucide-react";

const menuItems = [
  {
    name: "Projets",
    url: "/espace-installateur/projets",
    icon: LayoutDashboard,
  },
  {
    name: "Messages",
    url: "/espace-installateur/messages",
    icon: MessageSquare,
  },
  {
    name: "Profil",
    url: "/espace-installateur/profil",
    icon: UserCircle,
  },
  {
    name: "Abonnement",
    url: "/espace-installateur/abonnement",
    icon: Crown,
  },
  {
    name: "Leads",
    url: "/espace-installateur/leads",
    icon: Users,
  },
  {
    name: "Documents",
    url: "/espace-installateur/documents",
    icon: FileText,
  },
  {
    name: "Paramètres",
    url: "/espace-installateur/parametres",
    icon: Settings,
  },
  {
    name: "Notifications",
    url: "/espace-installateur/notifications",
    icon: Bell,
  },
];

export const InstallerSidebar = () => {
  const location = useLocation();
  const { open: isOpen } = useSidebar();

  return (
    <aside
      className={cn(
        "h-screen fixed top-0 left-0 z-40 bg-background border-r border-border transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex flex-col h-full py-4">
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <div key={item.name} className="flex items-center">
              <Link
                to={item.url}
                className={`${
                  location.pathname.includes(item.url)
                    ? "bg-primary/10 text-white"
                    : "hover:bg-primary/5 text-white/90 hover:text-white"
                } text-base flex items-center gap-3 w-full p-2 rounded-lg transition-colors duration-200`}
              >
                <item.icon className="h-5 w-5" />
                <span
                  className={cn(
                    "transition-all duration-200",
                    !isOpen && "opacity-0"
                  )}
                >
                  {item.name}
                </span>
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};