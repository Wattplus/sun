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
  Home, 
  Store, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings, 
  CreditCard,
  HelpCircle
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const menuItems = [
  {
    title: "Tableau de bord",
    icon: Home,
    path: "/espace-installateur"
  },
  {
    title: "Marketplace",
    icon: Store,
    path: "/espace-installateur/marketplace"
  },
  {
    title: "Mes Projets",
    icon: FileText,
    path: "/espace-installateur/projets"
  },
  {
    title: "Messages",
    icon: MessageSquare,
    path: "/espace-installateur/messages"
  },
  {
    title: "Clients",
    icon: Users,
    path: "/espace-installateur/clients"
  },
  {
    title: "Abonnement",
    icon: CreditCard,
    path: "/espace-installateur/abonnement"
  },
  {
    title: "Paramètres",
    icon: Settings,
    path: "/espace-installateur/parametres"
  },
  {
    title: "Aide",
    icon: HelpCircle,
    path: "/espace-installateur/aide"
  }
]

export function InstallerSidebar() {
  const location = useLocation()

  return (
    <Sidebar className="bg-gradient-to-b from-background/80 to-background border-r border-primary/10">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-primary px-4 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path} className="px-2">
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.path}
                    className="h-12 text-base font-medium hover:bg-primary/10 data-[active=true]:bg-primary/20"
                    tooltip={item.title}
                  >
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="text-base">{item.title}</span>
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