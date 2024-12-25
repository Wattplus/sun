import { Bell, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export const DashboardHeader = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: "Action",
      description: `${action} en cours de développement`,
    });
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Tableau de bord
        </h1>
        <p className="text-muted-foreground mt-1">
          Bienvenue dans votre espace installateur
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="sm" onClick={() => handleAction("notifications")} className="relative">
          <Bell className="h-4 w-4" />
          <Badge variant="secondary" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">2</Badge>
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleAction("calendrier")}>
          <Calendar className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};