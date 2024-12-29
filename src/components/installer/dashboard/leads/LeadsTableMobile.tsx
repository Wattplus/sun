import { Lead } from "@/types/crm";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LeadsTableMobileProps {
  leads: Lead[];
  getStatusColor: (status: string) => string;
  onStatusChange: (leadId: string, newStatus: Lead['installerStatus']) => void;
}

export const LeadsTableMobile = ({ leads, getStatusColor, onStatusChange }: LeadsTableMobileProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      <div className="space-y-4 pb-4">
        {leads.map((lead) => (
          <Card key={lead.id} className="p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <Badge 
                  variant="outline" 
                  className={lead.projectType === 'professional' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}
                >
                  {lead.projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}
                </Badge>
                <h3 className="mt-2 font-medium">
                  {lead.firstname} {lead.lastname}
                </h3>
              </div>
              <Select 
                value={lead.installerStatus || 'nouveau'} 
                onValueChange={(value) => onStatusChange(lead.id, value as Lead['installerStatus'])}
              >
                <SelectTrigger className={`w-[140px] ${getStatusColor(lead.installerStatus || 'nouveau')}`}>
                  <SelectValue />
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
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium">{lead.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Téléphone</p>
                <p className="font-medium">{lead.phone}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Code postal</p>
                <p className="font-medium">{lead.postalcode}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Type de toit</p>
                <p className="font-medium">{lead.roofType || "Non renseigné"}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground">Facture mensuelle</p>
                <p className="font-medium">{lead.monthlybill || "Non renseigné"}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};
