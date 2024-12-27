import { Card } from "@/components/ui/card";
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
        <Link to="/espace-installateur" className="text-lg font-semibold text-primary">
          WattPlus
        </Link>
      </div>
    </Card>
  );
};