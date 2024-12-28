import { motion } from "framer-motion";
import { Building2, Users, Wallet, LineChart } from "lucide-react";
import { Card } from "@/components/ui/card";

export function DashboardLanding() {
  const stats = [
    {
      title: "Leads disponibles",
      value: "24",
      icon: Users,
      description: "Nouveaux leads qualifiés",
    },
    {
      title: "Crédit disponible",
      value: "1 250€",
      icon: Wallet,
      description: "Solde de votre compte",
    },
    {
      title: "Taux de conversion",
      value: "68%",
      icon: LineChart,
      description: "Sur les 30 derniers jours",
    },
    {
      title: "Projets actifs",
      value: "12",
      icon: Building2,
      description: "En cours de réalisation",
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold">Bienvenue sur votre espace installateur</h1>
        <p className="text-muted-foreground">
          Gérez vos leads, suivez vos projets et développez votre activité
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="p-6 hover:shadow-lg transition-shadow duration-200 border-primary/10 hover:border-primary/20"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}