import { LayoutDashboard, Users, FileText, ShoppingBag, UserCircle, Settings, Bell, ChartBar, Euro, LineChart, AlertCircle, Download } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  {
    category: "Principal",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin"
      },
      {
        title: "Statistiques",
        icon: ChartBar,
        href: "/admin/statistics"
      }
    ]
  },
  {
    category: "Gestion",
    items: [
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
      },
      {
        title: "Utilisateurs",
        icon: Users,
        href: "/admin/users"
      },
      {
        title: "Prix",
        icon: Euro,
        href: "/admin/pricing"
      },
      {
        title: "Transactions",
        icon: LineChart,
        href: "/admin/transactions"
      },
      {
        title: "Réclamations",
        icon: AlertCircle,
        href: "/admin/complaints"
      },
      {
        title: "Export",
        icon: Download,
        href: "/admin/export"
      }
    ]
  },
  {
    category: "Compte",
    items: [
      {
        title: "Notifications",
        icon: Bell,
        href: "/admin/notifications",
        badge: 3
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
    ]
  }
];

export const AdminNavigation = () => {
  const location = useLocation();

  return (
    <nav className="space-y-6">
      {navItems.map((section, sectionIndex) => (
        <motion.div
          key={section.category}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: sectionIndex * 0.1 }}
          className="space-y-2"
        >
          <h2 className="text-xs uppercase text-white/50 font-semibold tracking-wider px-4">
            {section.category}
          </h2>
          <div className="space-y-1">
            {section.items.map((item, itemIndex) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (sectionIndex * section.items.length + itemIndex) * 0.1 }}
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
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </nav>
  );
};