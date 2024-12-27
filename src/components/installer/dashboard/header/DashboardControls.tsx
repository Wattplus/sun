import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Expand, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardControlsProps {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const DashboardControls = ({
  isFullscreen,
  toggleFullscreen,
}: DashboardControlsProps) => {
  return (
    <Card className="border-primary/10">
      <div className="p-2">
        <div className="flex items-center justify-between">
          <Link to="/espace-installateur" className="text-lg font-semibold text-primary">
            WattPlus
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-primary">
              <LogOut className="h-4 w-4 mr-2" />
              <span>Déconnexion</span>
            </Button>
            
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