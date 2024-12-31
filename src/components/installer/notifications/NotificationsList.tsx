import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, Euro, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export const NotificationsList = () => {
  const notifications = [
    {
      id: 1,
      type: "lead",
      title: "Nouveau lead disponible",
      description: "Un nouveau lead dans votre zone pour une installation solaire",
      time: "Il y a 5 minutes",
      priority: "high"
    },
    {
      id: 2,
      type: "message",
      title: "Nouveau message",
      description: "Jean D. a répondu à votre devis",
      time: "Il y a 1 heure",
      priority: "medium"
    },
    {
      id: 3,
      type: "balance",
      title: "Solde bas",
      description: "Votre solde prépayé est inférieur à 50€",
      time: "Il y a 2 heures",
      priority: "low"
    }
  ];

  const handleAction = (notifId: number) => {
    toast({
      title: "Action effectuée",
      description: `Notification ${notifId} traitée`,
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "lead":
        return <Bell className="h-4 w-4" />;
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "balance":
        return <Euro className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Notifications récentes</h3>
        <Button variant="ghost" size="sm">
          Tout marquer comme lu
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <Card key={notif.id} className="p-4">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-full ${getPriorityColor(notif.priority)}`}>
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{notif.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notif.description}
                    </p>
                  </div>
                  <Badge variant="outline">{notif.time}</Badge>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="mt-2"
                  onClick={() => handleAction(notif.id)}
                >
                  Voir les détails
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};