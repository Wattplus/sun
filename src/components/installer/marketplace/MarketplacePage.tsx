import { Card } from "@/components/ui/card";
import { LeadsList } from "../dashboard/LeadsList";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { PrepaidBalance } from "../dashboard/PrepaidBalance";
import { Lead } from "@/types/crm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Sparkles, ArrowRight, Info, TrendingUp, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";

export const MarketplacePage = () => {
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const { toast } = useToast();

  const handleLeadSelect = (lead: Lead) => {
    if (selectedLeads.some(l => l.id === lead.id)) {
      setSelectedLeads(selectedLeads.filter(l => l.id !== lead.id));
    } else {
      setSelectedLeads([...selectedLeads, lead]);
    }
  };

  const handlePurchaseLeads = () => {
    const total = selectedLeads.reduce((sum, lead) => sum + lead.price, 0);
    toast({
      title: "Achat de leads",
      description: `Redirection vers le paiement pour ${total}€...`,
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <InstallerBreadcrumb />

      <div className="bg-gradient-to-r from-[#0B1221] to-[#1A1F2C] p-8 rounded-xl border border-[#1EAEDB]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1EAEDB] via-[#33C3F0] to-[#1EAEDB] bg-clip-text text-transparent">
            Marketplace des Leads Qualifiés
          </h1>
          <p className="text-xl text-[#1EAEDB]/80">
            Développez votre activité avec des leads vérifiés et qualifiés
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <Badge variant="secondary" className="px-4 py-2 text-lg bg-[#1EAEDB]/10 text-[#1EAEDB] border-[#1EAEDB]/20">
              <TrendingUp className="w-5 h-5 mr-2" />
              Taux de conversion moyen : 25%
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg bg-[#1EAEDB]/10 text-[#1EAEDB] border-[#1EAEDB]/20">
              <Users className="w-5 h-5 mr-2" />
              {mockAvailableLeads.length} leads disponibles
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 p-6 relative overflow-hidden bg-[#0B1221] border-[#1EAEDB]/20">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1EAEDB]/5 to-transparent" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="h-5 w-5 text-[#1EAEDB]" />
              <h2 className="text-lg font-medium text-white">Tous les leads disponibles</h2>
            </div>
            <LeadsList 
              leads={mockAvailableLeads} 
              onLeadSelect={handleLeadSelect}
              selectedLeads={selectedLeads}
            />
          </div>
        </Card>

        <div className="space-y-6">
          <PrepaidBalance balance={150} />
          
          <Card className="p-6 bg-[#0B1221] border-[#1EAEDB]/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#1EAEDB]">
                <Info className="h-5 w-5" />
                <h3 className="font-medium">Pourquoi acheter ces leads ?</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-white/80">
                  <Badge variant="secondary" className="h-6 w-6 rounded-full p-1 bg-[#1EAEDB]/10 text-[#1EAEDB]">1</Badge>
                  Leads qualifiés et vérifiés
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <Badge variant="secondary" className="h-6 w-6 rounded-full p-1 bg-[#1EAEDB]/10 text-[#1EAEDB]">2</Badge>
                  Projets à fort potentiel
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <Badge variant="secondary" className="h-6 w-6 rounded-full p-1 bg-[#1EAEDB]/10 text-[#1EAEDB]">3</Badge>
                  Contact rapide recommandé
                </li>
              </ul>
              <Button className="w-full gap-2 bg-[#1EAEDB] hover:bg-[#1EAEDB]/90" size="lg">
                Recharger mon compte
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          {selectedLeads.length > 0 && (
            <Card className="p-6 bg-[#0B1221] border-[#1EAEDB]/20">
              <div className="space-y-4">
                <h3 className="font-medium flex items-center gap-2 text-[#1EAEDB]">
                  <ShoppingCart className="h-5 w-5" />
                  Récapitulatif de la sélection
                </h3>
                <div className="space-y-2">
                  {selectedLeads.map(lead => (
                    <div key={lead.id} className="flex justify-between text-sm text-white/80">
                      <span>{lead.firstName} {lead.lastName}</span>
                      <span className="font-medium text-[#1EAEDB]">{lead.price}€</span>
                    </div>
                  ))}
                  <div className="border-t border-[#1EAEDB]/20 pt-2 mt-2 flex justify-between font-medium text-white">
                    <span>Total</span>
                    <span className="text-[#1EAEDB]">{selectedLeads.reduce((sum, lead) => sum + lead.price, 0)}€</span>
                  </div>
                </div>
                <Button 
                  onClick={handlePurchaseLeads}
                  className="w-full bg-[#1EAEDB] hover:bg-[#1EAEDB]/90"
                  size="lg"
                >
                  Procéder au paiement
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};