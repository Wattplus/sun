import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Expand, Menu, User, Bell, LogOut, Home, MessageSquare, FileText, Settings, Package } from "lucide-react";
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
    { icon: Package, label: "Marketplace", path: "/espace-installateur/marketplace" },
    { icon: MessageSquare, label: "Messages", path: "/espace-installateur/messages" },
    { icon: FileText, label: "Documents", path: "/espace-installateur/documents" },
    { icon: Settings, label: "Paramètres", path: "/espace-installateur/parametres" },
  ];

  const userMenuItems = [
    { icon: Bell, label: "Notifications", path: "/espace-installateur/notifications" },
    { icon: User, label: "Mon profil", path: "/espace-installateur/mon-compte/profil" },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Card className="border-primary/10">
      <div className="p-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-primary">
              WattPlus
            </span>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  isActivePath(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-primary/5"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-2">
            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {userMenuItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button variant="ghost" size="icon" className="text-primary">
                    <item.icon className="h-5 w-5" />
                  </Button>
                </Link>
              ))}
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

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-primary">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="pt-10">
                  <div className="flex flex-col space-y-4">
                    {[...menuItems, ...userMenuItems].map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center space-x-2 text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setIsOpen(false)}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Déconnexion
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};