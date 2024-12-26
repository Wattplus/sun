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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.path}
                    tooltip={item.title}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
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