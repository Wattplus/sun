import React from "react";
import { Tooltip } from "@/components/ui/tooltip";

interface SidebarTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "right" | "left" | "top" | "bottom";
  align?: "start" | "center" | "end";
  hidden?: boolean;
}

export const SidebarTooltip = ({
  children,
  content,
  side = "right",
  align = "center",
  hidden = false,
}: SidebarTooltipProps) => {
  if (hidden) {
    return <>{children}</>;
  }

  return (
    <Tooltip content={content}>
      {children}
    </Tooltip>
  );
};