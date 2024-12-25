import { Bell, Calendar, LayoutDashboard, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const DashboardHeader = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    if (action === "voir_leads") {
      navigate("/espace-installateur/marketplace/nouveaux-leads");
    } else {
      toast({
        title: "Action en cours",
        description: `La fonctionnalité ${action} est en cours de développement`,
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* En-tête principal */}
      <div className="glass-panel p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-background" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-primary/10 rounded-2xl shadow-inner transition-all duration-300 hover:bg-primary/15">
                <LayoutDashboard className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Tableau de bord
                </h1>
                <p className="text-lg text-muted-foreground">
                  Bienvenue dans votre espace installateur
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => handleAction("notifications")} 
                className="relative bg-background/50 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <Bell className="h-5 w-5 text-primary" />
                <Badge 
                  variant="secondary" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-white animate-pulse"
                >
                  2
                </Badge>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => handleAction("calendrier")}
                className="bg-background/50 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <Calendar className="h-5 w-5 text-primary" />
              </Button>
            </div>
          </div>

          {/* Bouton CTA principal */}
          <Button
            size="lg"
            onClick={() => handleAction("voir_leads")}
            className="mt-8 w-full py-8 text-lg font-semibold bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white shadow-lg transition-all duration-300 hover:scale-[1.02] group"
          >
            <span className="flex items-center justify-center gap-3">
              Découvrir les nouveaux leads disponibles
              <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};