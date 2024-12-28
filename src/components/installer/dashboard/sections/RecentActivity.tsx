import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, FileText, Mail } from "lucide-react";

const activities = [
  {
    event: "Nouveau lead attribué",
    detail: "Client : Sophie Laurent, Toulouse",
    time: "Il y a 2h",
    action: { label: "Voir détail", icon: ArrowRight }
  },
  {
    event: "Devis accepté",
    detail: "Client : Pierre Martin, Bordeaux",
    time: "Il y a 4h",
    action: { label: "Préparer contrat", icon: FileText }
  },
  {
    event: "Installation planifiée",
    detail: "Client : Marie Dubois, Lyon",
    time: "Il y a 6h",
    action: { label: "Voir agenda", icon: Calendar }
  },
  {
    event: "Suivi demandé par client",
    detail: "Client : Jean Dupont, Marseille",
    time: "Il y a 8h",
    action: { label: "Contacter", icon: Mail }
  }
];

export function RecentActivity() {
  return (
    <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
      <h2 className="text-lg font-semibold mb-6 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
        Activité Récente
      </h2>
      
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