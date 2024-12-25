import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, MapPin, Euro, Calendar, Phone, Mail, FileText, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { calculateLeadPrice } from "@/utils/leadPricing";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PurchasedLeadsProps {
  leads: Lead[];
}

type LeadStatus = "nouveau" | "contacté" | "devis_envoyé" | "négociation" | "gagné" | "perdu";

const statusColors: Record<LeadStatus, string> = {
  nouveau: "bg-blue-500",
  contacté: "bg-yellow-500",
  devis_envoyé: "bg-purple-500",
  négociation: "bg-orange-500",
  gagné: "bg-green-500",
  perdu: "bg-red-500",
};

const statusIcons: Record<LeadStatus, React.ReactNode> = {
  nouveau: <Users className="h-4 w-4" />,
  contacté: <Phone className="h-4 w-4" />,
  devis_envoyé: <FileText className="h-4 w-4" />,
  négociation: <Euro className="h-4 w-4" />,
  gagné: <CheckCircle2 className="h-4 w-4" />,
  perdu: <XCircle className="h-4 w-4" />,
};

export const PurchasedLeads = ({ leads }: PurchasedLeadsProps) => {
  const [leadStatuses, setLeadStatuses] = useState<Record<string, LeadStatus>>({});
  const { toast } = useToast();

  const updateLeadStatus = (leadId: string, status: LeadStatus) => {
    setLeadStatuses(prev => ({ ...prev, [leadId]: status }));
    toast({
      title: "Statut mis à jour",
      description: `Le statut du lead a été mis à jour à "${status}"`,
    });
  };

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {leads.map((lead) => {
          const prices = calculateLeadPrice(lead);
          const purchaseCount = lead.purchasedBy?.length || 0;
          const remainingSpots = 3 - purchaseCount;
          const hasExclusivePurchase = lead.purchasedBy?.some(p => p.purchaseType === 'exclusif');
          const currentStatus = leadStatuses[lead.id] || "nouveau";

          return (
            <Card key={lead.id} className="p-6 hover:shadow-lg transition-all duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">
                      {lead.firstName} {lead.lastName.slice(0, 1)}••••••
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{lead.postalCode} {lead.city}</span>
                    </div>
                  </div>
                  <Select
                    value={currentStatus}
                    onValueChange={(value: LeadStatus) => updateLeadStatus(lead.id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center gap-2">
                        {statusIcons[currentStatus]}
                        <Badge className={`${statusColors[currentStatus]} text-white`}>
                          {currentStatus}
                        </Badge>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusColors).map(([status]) => (
                        <SelectItem key={status} value={status}>
                          <div className="flex items-center gap-2">
                            {statusIcons[status as LeadStatus]}
                            <span>{status}</span>
                          </div>
                        </SelectItem>
                      ))}
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
                      {lead.projectType}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      window.location.href = `tel:${lead.phone}`;
                      if (currentStatus === "nouveau") {
                        updateLeadStatus(lead.id, "contacté");
                      }
                    }}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      window.location.href = `mailto:${lead.email}`;
                      if (currentStatus === "nouveau") {
                        updateLeadStatus(lead.id, "contacté");
                      }
                    }}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      toast({
                        title: "Devis",
                        description: "Ouverture de l'éditeur de devis...",
                      });
                      updateLeadStatus(lead.id, "devis_envoyé");
                    }}
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
                  <div className="flex items-center gap-2">
                    {!hasExclusivePurchase && (
                      <Badge variant="outline" className="bg-primary/10">
                        {remainingSpots} place{remainingSpots > 1 ? 's' : ''} restante{remainingSpots > 1 ? 's' : ''}
                      </Badge>
                    )}
                    <Badge variant="outline" className="bg-primary/10">
                      {hasExclusivePurchase ? 'Exclusif' : 'Mutualisé'} - {hasExclusivePurchase ? prices.exclusivePrice : prices.mutualPrice}€
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
        {leads.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Vous n'avez pas encore acheté de leads.</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};