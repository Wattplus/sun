import { LayoutDashboard, Users, FileText, ShoppingBag } from "lucide-react";
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
    title: "Marketplace",
    icon: ShoppingBag,
    href: "/admin/marketplace"
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
              "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
              location.pathname === item.href
                ? "bg-accent text-white"
                : "text-white/70 hover:bg-accent/20 hover:text-white"
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.title}
          </Link>
        </motion.div>
      ))}
    </nav>
  );
};