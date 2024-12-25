import { Star, Award, BadgeCheck } from "lucide-react";

export const getRatingBadge = (conversionRate: number) => {
  if (conversionRate >= 80) {
    return {
      icon: <Award className="h-5 w-5 text-yellow-500" />,
      label: "Expert",
      description: "Performance exceptionnelle"
    };
  }
  if (conversionRate >= 60) {
    return {
      icon: <BadgeCheck className="h-5 w-5 text-emerald-500" />,
      label: "Certifié",
      description: "Très bonne performance"
    };
  }
  return {
    icon: <Star className="h-5 w-5 text-blue-500" />,
    label: "Standard",
    description: "Performance normale"
  };
};