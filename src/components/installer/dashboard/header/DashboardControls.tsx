import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Expand, Menu, LogOut } from "lucide-react";
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
          <Link to="/espace-installateur" className="text-lg font-semibold text-primary">
            WattPlus
          </Link>

          {/* Right Controls */}
          <div className="flex items-center space-x-2">
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