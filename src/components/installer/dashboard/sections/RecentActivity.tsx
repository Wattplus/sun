import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, RefreshCw } from "lucide-react";

const activities = [
  {
    event: "Nouveau devis généré",
    detail: "Client : Sophie Laurent, 3kWc",
    time: "Il y a 2h",
    action: { label: "Voir le lead", icon: ArrowRight }
  },
  {
    event: "Lead qualifié contacté",
    detail: "Client : Pierre Martin, Bordeaux",
    time: "Il y a 4h",
    action: { label: "Relancer", icon: RefreshCw }
  },
  {
    event: "Installation planifiée",
    detail: "Client : Marie Dubois, Lyon",
    time: "Il y a 6h",
    action: { label: "Voir agenda", icon: Calendar }
  }
];

export function RecentActivity() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Activité Récente</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.action.icon;
          return (
            <div 
              key={index}
              className="flex items-start justify-between p-4 rounded-lg hover:bg-primary/5 transition-colors"
            >
              <div className="space-y-1">
                <h3 className="font-medium">{activity.event}</h3>
                <p className="text-sm text-muted-foreground">{activity.detail}</p>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-2">
                {activity.action.label}
                <Icon className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}