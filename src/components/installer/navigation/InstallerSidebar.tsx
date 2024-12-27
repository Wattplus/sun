import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  ShoppingBag,
  MessageSquare,
  Settings,
  HelpCircle,
  Users,
  FileText,
  Sparkles,
  Zap
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const menuItems = [
  { title: "Tableau de bord", url: "/espace-installateur", icon: LayoutDashboard },
  { title: "Projets", url: "/projets", icon: Sparkles },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Profil", url: "/profil", icon: Users },
  { title: "Abonnement", url: "/abonnement", icon: FileText },
  { title: "Leads", url: "/leads", icon: ShoppingBag },
  { title: "Documents", url: "/documents", icon: HelpCircle },
  { title: "Paramètres", url: "/parametres", icon: Settings },
  { title: "Notifications", url: "/notifications", icon: HelpCircle },
];

export function InstallerSidebar() {
  const location = useLocation()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-primary px-4 py-2">
            <div className="flex items-center justify-center gap-1">
              <Zap className="h-5 w-5 text-primary" />
              <span>Wattplus</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={`${
                        location.pathname.includes(item.url)
                          ? "bg-[#1EAEDB]/10 text-[#1EAEDB]"
                          : "hover:bg-[#1EAEDB]/5"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}