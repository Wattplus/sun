import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ListFilter, MapPin, Users, Building2, Calendar } from "lucide-react";

export const LeadsNavMenu = () => {
  return (
    <Card className="border border-primary/10 bg-background/50 backdrop-blur-sm">
      <div className="p-2 flex items-center gap-2 overflow-x-auto">
        <Button 
          variant="ghost" 
          className="gap-2 text-primary/80 hover:text-primary hover:bg-primary/10"
        >
          <ListFilter className="w-4 h-4" />
          Tous les leads
        </Button>
        <Button 
          variant="ghost" 
          className="gap-2 text-primary/80 hover:text-primary hover:bg-primary/10"
        >
          <MapPin className="w-4 h-4" />
          Par région
        </Button>
        <Button 
          variant="ghost" 
          className="gap-2 text-primary/80 hover:text-primary hover:bg-primary/10"
        >
          <Users className="w-4 h-4" />
          Type de client
        </Button>
        <Button 
          variant="ghost" 
          className="gap-2 text-primary/80 hover:text-primary hover:bg-primary/10"
        >
          <Building2 className="w-4 h-4" />
          Type de projet
        </Button>
        <Button 
          variant="ghost" 
          className="gap-2 text-primary/80 hover:text-primary hover:bg-primary/10"
        >
          <Calendar className="w-4 h-4" />
          Date d'ajout
        </Button>
      </div>
    </Card>
  );
};