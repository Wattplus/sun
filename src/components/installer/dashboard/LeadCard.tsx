import { Lead } from "@/types/crm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";

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
          <div className="font-semibold">
            {lead.firstName} {lead.lastName}
          </div>
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger 
              className="w-[140px]"
              onClick={(e) => e.preventDefault()} // Prevent navigation when clicking the select
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
          <div className="grid gap-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Email:</span> {lead.email}
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Téléphone:</span> {lead.phone}
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Ville:</span> {lead.city}
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Budget:</span> {lead.budget}€
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};