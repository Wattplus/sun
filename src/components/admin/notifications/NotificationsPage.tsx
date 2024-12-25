import { Bell, Check, Clock, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const notifications = [
  {
    id: 1,
    title: "Nouveau lead disponible",
    description: "Un nouveau lead a été ajouté dans votre région",
    time: "Il y a 5 minutes",
    unread: true,
    type: "lead"
  },
  {
    id: 2,
    title: "Mise à jour du système",
    description: "Une nouvelle version de la plateforme est disponible",
    time: "Il y a 2 heures",
    unread: true,
    type: "system"
  },
  {
    id: 3,
    title: "Nouvel installateur validé",
    description: "L'entreprise 'Solar Pro' a rejoint la plateforme",
    time: "Il y a 1 jour",
    unread: true,
    type: "installer"
  }
];

const NotificationsPage = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6 text-primary" />
          Notifications
        </h1>
        <Button variant="outline" size="sm">
          Tout marquer comme lu
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{notification.title}</h3>
                <p className="text-white/70">{notification.description}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-white/50">
                  <Clock className="h-4 w-4" />
                  {notification.time}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost">
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;