import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { ReactNode } from "react";

type SidebarState = "expanded" | "collapsed";

interface SidebarMenuButtonProps {
  icon: ReactNode;
  label: string;
  tooltip?: string;
  state: SidebarState;
  isMobile: boolean;
  onClick?: () => void;
}

const SidebarMenuButton = ({
  icon,
  label,
  tooltip,
  state,
  isMobile,
  ...props
}: SidebarMenuButtonProps) => {
  const button = (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start",
        state === "collapsed" && "px-2",
        isMobile && "px-2"
      )}
      {...props}
    >
      {icon}
      {(state === "expanded" || isMobile) && (
        <span className="ml-2">{label}</span>
      )}
    </Button>
  );

  if (!tooltip) {
    return button;
  }

  return (
    <Tooltip content={tooltip}>
      {button}
    </Tooltip>
  );
};

interface SidebarProps {
  children: ReactNode;
  state: SidebarState;
  isMobile: boolean;
}

export function Sidebar({ children, state, isMobile }: SidebarProps) {
  return (
    <div
      className={cn(
        "flex h-screen flex-col gap-4 border-r border-border/40 bg-background/95 p-4",
        state === "expanded" && !isMobile ? "w-64" : "w-[60px]",
        isMobile && "w-full"
      )}
    >
      {children}
    </div>
  );
}

interface SidebarSectionProps {
  children: ReactNode;
  className?: string;
}

export function SidebarSection({ children, className }: SidebarSectionProps) {
  return <div className={cn("flex flex-col gap-1", className)}>{children}</div>;
}

export { SidebarMenuButton };