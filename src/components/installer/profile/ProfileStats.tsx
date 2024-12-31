import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Eye, MessageSquare, Star, Users, Award, BarChart3 } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase-client"

export const ProfileStats = () => {
  const [stats, setStats] = useState({
    profileViews: 0,
    messagesReceived: 0,
    averageRating: 0,
    satisfiedClients: 0,
    certificationCount: 0,
    conversionRate: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.id) return;

        const { data: installer, error } = await supabase
          .from('installers')
          .select('*')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching installer stats:", error);
          return;
        }

        if (installer) {
          // Calculer le nombre de certifications actives
          const certifications = installer.certifications || {};
          const activeCertifications = Object.values(certifications).filter(Boolean).length;

          setStats({
            profileViews: installer.profile_views || 0,
            messagesReceived: 0, // À implémenter avec la table messages
            averageRating: 4.8, // Valeur par défaut pour le moment
            satisfiedClients: installer.satisfied_clients || 0,
            certificationCount: activeCertifications,
            conversionRate: Number(installer.conversion_rate) || 0
          });
        }
      } catch (error) {
        console.error("Error in fetchStats:", error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Vues du profil",
      value: stats.profileViews,
      icon: Eye,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Messages reçus",
      value: stats.messagesReceived,
      icon: MessageSquare,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Note moyenne",
      value: `${stats.averageRating}`,
      icon: Star,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Clients satisfaits",
      value: stats.satisfiedClients,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Certifications",
      value: stats.certificationCount,
      icon: Award,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Taux de conversion",
      value: `${stats.conversionRate}%`,
      icon: BarChart3,
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {stat.title}
              </p>
              <p className="text-2xl font-bold mt-1 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {stat.value}
              </p>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};