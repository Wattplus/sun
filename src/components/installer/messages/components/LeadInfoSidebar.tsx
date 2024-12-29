import { Home, Sun, Euro, MapPin, Phone, Mail, Plus, Calendar, FileText, Video, MessageSquare } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

interface LeadInfoSidebarProps {
  onQuickAction: (action: string) => void;
}

export const LeadInfoSidebar = ({ onQuickAction }: LeadInfoSidebarProps) => {
  return (
    <Card className="col-span-12 md:col-span-3 p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center">
              AM
            </div>
          </Avatar>
          <div>
            <h3 className="font-semibold">Accard Marie</h3>
            <Badge variant="secondary" className="mt-1">Lead Photovoltaïque</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 bg-secondary/5 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <Home className="h-4 w-4 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Type de projet</p>
            <p className="font-medium">Résidentiel - 35m²</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Orientation</p>
            <p className="font-medium">Plein Sud</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Euro className="h-4 w-4 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Facture mensuelle</p>
            <p className="font-medium">180€</p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">mlerrible@wanadoo.fr</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Téléphone</p>
            <p className="font-medium">0674909294</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Adresse</p>
            <p className="font-medium">25380 longevelle les russey</p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => onQuickAction('devis')}
        >
          <FileText className="h-4 w-4 mr-2" />
          Envoyer un devis
        </Button>

        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => onQuickAction('visio')}
        >
          <Video className="h-4 w-4 mr-2" />
          Planifier un RDV visio
        </Button>

        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => onQuickAction('note')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une note
        </Button>

        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => onQuickAction('rappel')}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Ajouter un rappel
        </Button>

        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => onQuickAction('message')}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Envoyer un SMS
        </Button>
      </div>
    </Card>
  );
};