import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, MapPin, Euro, Calendar, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface PurchasedLeadsProps {
  leads: Lead[];
}

export const PurchasedLeads = ({ leads }: PurchasedLeadsProps) => {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Mes Leads Achetés</h2>
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {leads.map((lead) => (
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
                  <Badge variant="outline">
                    {formatDistanceToNow(new Date(lead.createdAt), { 
                      addSuffix: true,
                      locale: fr 
                    })}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="font-medium">{lead.budget.toLocaleString()}€</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type de projet</p>
                    <Badge variant="secondary" className="mt-1">
                      {lead.projectType}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.location.href = `tel:${lead.phone}`}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.location.href = `mailto:${lead.email}`}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Envoyer un email
                  </Button>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 text-primary" />
                    <span>
                      {lead.purchasedBy?.length || 0} autre{lead.purchasedBy?.length !== 1 ? 's' : ''} installateur{lead.purchasedBy?.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <Badge variant="outline" className="bg-primary/10">
                    {lead.purchasedBy?.find(p => p.purchaseType === 'exclusif') ? 'Exclusif' : 'Mutualisé'}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
          {leads.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Vous n'avez pas encore acheté de leads.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};