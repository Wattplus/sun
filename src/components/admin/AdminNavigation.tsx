import { LayoutDashboard, Users, FileText, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

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
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100",
            location.pathname === item.href
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          <item.icon className="mr-3 h-5 w-5" />
          {item.title}
        </Link>
      ))}
    </nav>
  );
};