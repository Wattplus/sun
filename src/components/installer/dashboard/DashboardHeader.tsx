import { Bell, Calendar, LayoutDashboard } from "lucide-react";
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
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-background rounded-lg -z-10" />
      <div className="p-8">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <LayoutDashboard className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Tableau de bord
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Bienvenue dans votre espace installateur
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => handleAction("notifications")} 
              className="relative bg-background/50 border-primary/20 hover:border-primary/40"
            >
              <Bell className="h-5 w-5 text-primary" />
              <Badge 
                variant="secondary" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-white"
              >
                2
              </Badge>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => handleAction("calendrier")}
              className="bg-background/50 border-primary/20 hover:border-primary/40"
            >
              <Calendar className="h-5 w-5 text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};