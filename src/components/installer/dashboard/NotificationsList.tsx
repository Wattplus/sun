import { Card } from "@/components/ui/card";
import { Package, MessageSquare, ChevronRight } from "lucide-react";

const mockNotifications = [
  {
    id: "1",
    content: "3 nouveaux leads disponibles dans votre région",
    type: "lead",
    date: "Il y a 1 heure"
  },
  {
    id: "2",
    content: "Nouveau message du support",
    type: "message",
    date: "Il y a 2 heures"
  }
];

export const NotificationsList = () => {
  return (
    <Card className="bg-background/50 backdrop-blur-md border-primary/20 p-6">
      <h2 className="text-lg font-semibold mb-4">Notifications récentes</h2>
      <div className="space-y-3">
        {mockNotifications.map((notification) => (
          <div key={notification.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background transition-all cursor-pointer">
            <div className="flex items-center gap-3">
              {notification.type === 'lead' ? (
                <Package className="h-5 w-5 text-primary" />
              ) : (
                <MessageSquare className="h-5 w-5 text-primary" />
              )}
              <div>
                <p className="text-sm">{notification.content}</p>
                <p className="text-xs text-muted-foreground">{notification.date}</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    </Card>
  );
};