import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { TrendingUp, Users, Star, Award } from "lucide-react"

export const ProfileStats = () => {
  const stats = [
    {
      icon: TrendingUp,
      label: "Taux de conversion",
      value: "78%",
      trend: "+8% ce mois",
      description: "Performance exceptionnelle",
      color: "text-emerald-500"
    },
    {
      icon: Users,
      label: "Clients satisfaits",
      value: "156",
      trend: "+12 ce mois",
      description: "Croissance stable",
      color: "text-blue-500"
    },
    {
      icon: Star,
      label: "Note moyenne",
      value: "4.8",
      trend: "sur 5 étoiles",
      description: "Basé sur 89 avis",
      color: "text-amber-500"
    },
    {
      icon: Award,
      label: "Certifications",
      value: "3",
      trend: "RGE, QualiPV, Qualibat",
      description: "Expert certifié",
      color: "text-purple-500"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div key={stat.label} variants={item}>
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-white/60">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <span className="text-sm text-white/60">{stat.trend}</span>
                  </div>
                  <p className="text-sm text-white/40">{stat.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};