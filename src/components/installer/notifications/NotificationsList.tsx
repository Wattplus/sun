import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { toast } from "sonner";

interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
}

export const NotificationsList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      message: "Nouveau lead disponible dans votre zone",
      date: "2024-03-20",
      read: false
    },
    {
      id: "2",
      message: "Votre solde est faible",
      date: "2024-03-19",
      read: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    toast("Notification marquée comme lue");
  };

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card 
          key={notification.id}
          className={`p-4 ${notification.read ? 'bg-background/50' : 'bg-primary/5'}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-muted-foreground">{notification.date}</p>
              </div>
            </div>
            {!notification.read && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => markAsRead(notification.id)}
                className="text-xs"
              >
                Marquer comme lu
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};