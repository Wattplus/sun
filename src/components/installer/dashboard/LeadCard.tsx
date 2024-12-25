import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lead } from "@/types/crm";
import { MapPin, Euro, Calendar, Phone, Mail, FileText, Lock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

interface LeadCardProps {
  lead: Lead;
  status: string;
  onStatusChange: (status: string) => void;
}

export const LeadCard = ({ lead, status, onStatusChange }: LeadCardProps) => {
  const { toast } = useToast();

  const handleContact = (type: 'phone' | 'email' | 'quote') => {
    let action = '';
    if (type === 'phone') {
      window.location.href = `tel:${lead.phone}`;
      action = 'Appel';
    } else if (type === 'email') {
      window.location.href = `mailto:${lead.email}`;
      action = 'Email';
    } else {
      action = 'Devis';
    }

    toast({
      title: `${action} en cours`,
      description: `${action} pour ${lead.firstName} ${lead.lastName}`,
    });

    if (status === "nouveau") {
      onStatusChange("contacté");
    }
  };

  return (
    <Card key={lead.id} className="p-6 hover:shadow-lg transition-all duration-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">
              {lead.firstName} {lead.lastName}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span>{lead.postalCode} {lead.city}</span>
            </div>
          </div>
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nouveau">Nouveau</SelectItem>
              <SelectItem value="contacté">Contacté</SelectItem>
              <SelectItem value="devis_envoyé">Devis envoyé</SelectItem>
              <SelectItem value="négociation">En négociation</SelectItem>
              <SelectItem value="gagné">Gagné</SelectItem>
              <SelectItem value="perdu">Perdu</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Budget</p>
            <p className="font-medium">{lead.budget.toLocaleString()}€</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Type de projet</p>
            <Badge variant="secondary" className="mt-1">
              {lead.projectType === 'residential' ? 'Résidentiel' : 'Professionnel'}
            </Badge>
          </div>
        </div>

        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => handleContact('phone')}
          >
            <Phone className="h-4 w-4 mr-2" />
            {lead.phone}
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => handleContact('email')}
          >
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => handleContact('quote')}
          >
            <FileText className="h-4 w-4 mr-2" />
            Devis
          </Button>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>
              {formatDistanceToNow(new Date(lead.createdAt), { 
                addSuffix: true,
                locale: fr 
              })}
            </span>
          </div>
          <Badge variant="outline" className="bg-primary/10">
            {lead.price}€
          </Badge>
        </div>
      </div>
    </Card>
  );
};