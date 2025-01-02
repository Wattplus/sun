import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
}

export const StatsCard = ({ title, value, change, trend, icon: Icon }: StatsCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          <div className="flex items-center gap-1">
            {trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            )}
            <p className={cn(
              "text-sm font-medium",
              trend === 'up' ? "text-green-500" : "text-red-500"
            )}>
              {change}
            </p>
          </div>
        </div>
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
};