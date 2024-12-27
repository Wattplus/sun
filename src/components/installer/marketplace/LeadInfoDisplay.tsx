import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, User, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LeadInfoDisplayProps {
  lead: Lead;
}

export const LeadInfoDisplay = ({ lead }: LeadInfoDisplayProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">
          Demande d'étude gratuite
        </h3>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          {lead.projectType === 'professional' ? 'Projet Pro' : 'Projet Résidentiel'}
        </Badge>
      </div>
      
      <p className="text-sm text-white/60">
        Découvrez le potentiel d'économies de ce projet
      </p>

      <div className="grid gap-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-white/80">
          <Users className="h-4 w-4 text-primary" />
          <span className="font-medium">Type de projet :</span>
          <span>{lead.projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}</span>
        </div>

        <div className="flex items-center gap-2 text-white/80">
          <User className="h-4 w-4 text-primary" />
          <span className="font-medium">Nom complet :</span>
          <span>{lead.firstName} {lead.lastName}</span>
        </div>

        <div className="flex items-center gap-2 text-white/80">
          <Mail className="h-4 w-4 text-primary" />
          <span className="font-medium">Email :</span>
          <span className="font-mono">••••••@•••••.••</span>
        </div>

        <div className="flex items-center gap-2 text-white/80">
          <Phone className="h-4 w-4 text-primary" />
          <span className="font-medium">Téléphone :</span>
          <span className="font-mono">••• ••• •••</span>
        </div>

        <div className="flex items-center gap-2 text-white/80">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="font-medium">Code postal :</span>
          <span>{lead.postalCode}</span>
        </div>
      </div>
    </div>
  );
};