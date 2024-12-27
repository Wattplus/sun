import { Lead } from "@/types/crm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin } from "lucide-react";

interface LeadCardProps {
  lead: Lead;
  status: string;
  onStatusChange: (status: string) => void;
}

export const LeadCard = ({ lead, status, onStatusChange }: LeadCardProps) => {
  return (
    <Link to={`/espace-installateur/leads/${lead.id}`}>
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <div className="font-semibold text-lg">
              {lead.firstName} {lead.lastName}
            </div>
            <Badge 
              variant="outline" 
              className={`
                ${lead.projectType === 'professional' 
                  ? 'bg-amber-500/10 text-amber-600 border-amber-200/20' 
                  : 'bg-emerald-500/10 text-emerald-600 border-emerald-200/20'
                }
              `}
            >
              {lead.projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}
            </Badge>
          </div>
          <Select 
            value={status} 
            onValueChange={onStatusChange}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <SelectTrigger 
              className="w-[140px]"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nouveau">Nouveau</SelectItem>
              <SelectItem value="contacte">Contacté</SelectItem>
              <SelectItem value="devis_envoye">Devis envoyé</SelectItem>
              <SelectItem value="rdv_planifie">RDV planifié</SelectItem>
              <SelectItem value="negociation">En négociation</SelectItem>
              <SelectItem value="signe">Signé</SelectItem>
              <SelectItem value="perdu">Perdu</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{lead.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{lead.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{lead.city} ({lead.postalCode})</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};