import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Expand, Menu, User, Bell, LogOut, Home, MessageSquare, FileText, Settings, Package, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface DashboardControlsProps {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const DashboardControls = ({
  isFullscreen,
  toggleFullscreen,
}: DashboardControlsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Tableau de bord", path: "/espace-installateur" },
    { icon: ShoppingCart, label: "Nouveaux leads", path: "/espace-installateur/leads/nouveaux" },
    { icon: Package, label: "Leads achetés", path: "/espace-installateur/leads/achetes" },
    { icon: MessageSquare, label: "Messages", path: "/espace-installateur/messages" },
    { icon: FileText, label: "Rapports", path: "/espace-installateur/rapports" },
    { icon: Settings, label: "Paramètres", path: "/espace-installateur/parametres" },
  ];

  const userMenuItems = [
    { icon: Bell, label: "Notifications", path: "/espace-installateur/notifications" },
    { icon: User, label: "Mon profil", path: "/espace-installateur/mon-compte/profil" },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const renderNavLink = (item: { icon: any, label: string, path: string }) => {
    const Icon = item.icon;
    return (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
          isActivePath(item.path)
            ? "bg-primary text-primary-foreground"
            : "text-foreground hover:bg-primary/5"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <Icon className="h-4 w-4" />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <Card className="border-primary/10">
      <div className="p-2">
        <div className="flex items-center justify-between">
          <Link to="/espace-installateur" className="text-lg font-semibold text-primary">
            WattPlus
          </Link>

          {/* Navigation Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map(renderNavLink)}
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-2">
            {/* User Menu - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              {userMenuItems.map(renderNavLink)}
            </div>
            
            {/* Fullscreen Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-primary"
            >
              <Expand className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-primary">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4">
                    {menuItems.map(renderNavLink)}
                    {userMenuItems.map(renderNavLink)}
                    <Button 
                      variant="destructive" 
                      className="mt-4 w-full justify-start gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Déconnexion</span>
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};