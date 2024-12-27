import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShoppingCart,
  FileText,
  Bell,
  Menu,
  UserPlus,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Leads", href: "/leads", icon: UserPlus },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Purchases", href: "/purchases", icon: ShoppingCart },
];

export function InstallerSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent className="flex h-full flex-col bg-gradient-to-b from-background to-primary/20">
        <div className="flex h-24 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <Menu className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-white">Espace Pro</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10"
            asChild
          >
            <SidebarTrigger>
              <ChevronLeft className="h-5 w-5 text-primary" />
            </SidebarTrigger>
          </Button>
        </div>
        <nav className="flex-1 space-y-2 px-4 py-6">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-white"
                    : "text-primary/80 hover:bg-primary/10 hover:text-white"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </SidebarContent>
    </Sidebar>
  );
}
