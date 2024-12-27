import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";

interface DashboardControlsProps {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const DashboardControls = ({ isFullscreen, toggleFullscreen }: DashboardControlsProps) => {
  return (
    <div className="flex justify-end items-center gap-2">
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