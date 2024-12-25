import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  trendIcon: LucideIcon;
  trendColor: "green" | "red" | "yellow";
}

const StatCard = ({ title, value, change, icon: Icon, trendIcon: TrendIcon, trendColor }: StatCardProps) => {
  const colorMap = {
    green: "text-green-500",
    red: "text-red-500",
    yellow: "text-yellow-500",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-500" />
        </div>
        <TrendIcon className={`h-4 w-4 ${colorMap[trendColor]}`} />
      </div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-semibold mt-1">{value}</p>
      <p className={`text-xs ${colorMap[trendColor]} mt-2`}>{change}</p>
    </div>
  );
};

export default StatCard;