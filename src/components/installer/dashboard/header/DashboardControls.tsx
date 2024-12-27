import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Expand, Menu, User, Bell, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Link } from "react-router-dom";

interface DashboardControlsProps {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const DashboardControls = ({
  isFullscreen,
  toggleFullscreen,
}: DashboardControlsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="border-primary/10">
      <div className="p-2">
        <div className="flex items-center justify-between">
          {/* Mobile Menu */}
          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="pt-10">
                <div className="flex flex-col space-y-4">
                  <Link 
                    to="/espace-installateur/notifications" 
                    className="flex items-center space-x-2 text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </Link>
                  <Link 
                    to="/espace-installateur/mon-compte/profil" 
                    className="flex items-center space-x-2 text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>Mon profil</span>
                  </Link>
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

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-primary hidden sm:block">
              WattPlus
            </span>
          </div>

          {/* Desktop Controls */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/espace-installateur/notifications">
                <Button variant="ghost" size="icon" className="text-primary">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/espace-installateur/mon-compte/profil">
                <Button variant="ghost" size="icon" className="text-primary">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-primary"
            >
              <Expand className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};