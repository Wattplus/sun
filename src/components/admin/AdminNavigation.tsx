import { LayoutDashboard, Users, FileText, ShoppingBag, UserCircle, Settings, Bell, ChartBar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin"
  },
  {
    title: "Leads",
    icon: FileText,
    href: "/admin/leads"
  },
  {
    title: "Installateurs",
    icon: Users,
    href: "/admin/installers"
  },
  {
    title: "Statistiques",
    icon: ChartBar,
    href: "/admin/statistics"
  },
  {
    title: "Marketplace",
    icon: ShoppingBag,
    href: "/admin/marketplace"
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "/admin/notifications"
  },
  {
    title: "Paramètres",
    icon: Settings,
    href: "/admin/settings"
  },
  {
    title: "Profil",
    icon: UserCircle,
    href: "/admin/profile"
  }
];

export const AdminNavigation = () => {
  const location = useLocation();

  return (
    <nav className="space-y-1">
      {navItems.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link
            to={item.href}
            className={cn(
              "flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
              location.pathname === item.href
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "text-white/70 hover:bg-primary/20 hover:text-white"
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.title}
            {item.title === "Notifications" && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                3
              </span>
            )}
          </Link>
        </motion.div>
      ))}
    </nav>
  );
};