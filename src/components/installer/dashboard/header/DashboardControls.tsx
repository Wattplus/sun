import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeft, Maximize2, Minimize2 } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

interface DashboardControlsProps {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const DashboardControls = ({ isFullscreen, toggleFullscreen }: DashboardControlsProps) => {
  const { open, toggleSidebar } = useSidebar();

  return (
    <div className="flex justify-between items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="hover:bg-primary/10 text-primary"
      >
        {open ? (
          <PanelLeftClose className="h-5 w-5" />
        ) : (
          <PanelLeft className="h-5 w-5" />
        )}
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="hover:bg-primary/10"
        onClick={toggleFullscreen}
      >
        {isFullscreen ? (
          <Minimize2 className="h-5 w-5" />
        ) : (
          <Maximize2 className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};