import { Card } from "@/components/ui/card";
import { Eye, MessageSquare, Star, Users, Award, TrendingUp } from "lucide-react";

interface ProfileStatsProps {
  stats?: {
    profileViews: number;
    messagesReceived: number;
    averageRating: number;
    satisfiedClients: number;
    certificationsCount: number;
    conversionRate: number;
  };
}

export const ProfileStats = ({ stats = {} }: ProfileStatsProps) => {
  const defaultStats = {
    profileViews: stats.profileViews ?? 0,
    messagesReceived: stats.messagesReceived ?? 0,
    averageRating: stats.averageRating ?? 0,
    satisfiedClients: stats.satisfiedClients ?? 0,
    certificationsCount: stats.certificationsCount ?? 0,
    conversionRate: stats.conversionRate ?? 0,
  };

  const statItems = [
    {
      label: "Vues du profil",
      value: defaultStats.profileViews,
      icon: Eye,
      color: "text-blue-500",
    },
    {
      label: "Messages reçus",
      value: defaultStats.messagesReceived,
      icon: MessageSquare,
      color: "text-green-500",
    },
    {
      label: "Note moyenne",
      value: `${defaultStats.averageRating.toFixed(1)}/5`,
      icon: Star,
      color: "text-yellow-500",
    },
    {
      label: "Clients satisfaits",
      value: defaultStats.satisfiedClients,
      icon: Users,
      color: "text-purple-500",
    },
    {
      label: "Certifications",
      value: defaultStats.certificationsCount,
      icon: Award,
      color: "text-orange-500",
    },
    {
      label: "Taux de conversion",
      value: `${defaultStats.conversionRate}%`,
      icon: TrendingUp,
      color: "text-indigo-500",
    },
  ];

  return (
    <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center p-4 rounded-lg bg-background/30">
            <item.icon className={`h-8 w-8 ${item.color} mb-2`} />
            <span className="text-2xl font-bold">{item.value}</span>
            <span className="text-sm text-muted-foreground text-center">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};