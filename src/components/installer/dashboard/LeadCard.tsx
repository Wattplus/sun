import { Lead } from "@/types/crm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Home, CreditCard } from "lucide-react";

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
          <div 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="relative z-10"
          >
            <Select 
              value={status} 
              onValueChange={onStatusChange}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={5}>
                <SelectItem value="nouveau">Nouveau</SelectItem>
                <SelectItem value="contacte">Contacté</SelectItem>
                <SelectItem value="devis_envoye">Devis envoyé</SelectItem>
                <SelectItem value="rdv_planifie">RDV planifié</SelectItem>
                <SelectItem value="negociation">En négociation</SelectItem>
                <SelectItem value="signe">Signé</SelectItem>
                <SelectItem value="perdu">Perdu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="min-w-32 text-muted-foreground">Type de projet:</span>
              <span>{lead.projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="min-w-32 text-muted-foreground">Prénom:</span>
              <span>{lead.firstName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="min-w-32 text-muted-foreground">Nom:</span>
              <span>{lead.lastName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="min-w-32 text-muted-foreground">Email:</span>
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{lead.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="min-w-32 text-muted-foreground">Téléphone:</span>
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{lead.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="min-w-32 text-muted-foreground">Code postal:</span>
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{lead.postalCode}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="min-w-32 text-muted-foreground">Type de toit:</span>
              <Home className="h-4 w-4 text-muted-foreground" />
              <span>{lead.roofType ? lead.roofType.replace(/-/g, ' ') : 'Non renseigné'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="min-w-32 text-muted-foreground">Facture mensuelle:</span>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span>{lead.monthlyBill ? `${lead.monthlyBill}€/mois` : 'Non renseigné'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};