import { useState } from "react";
import { Card } from "@/components/ui/card";
import { LeadsList } from "../dashboard/LeadsList";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { PrepaidBalance } from "../dashboard/PrepaidBalance";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CheckCircle2, TrendingUp, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Lead } from "@/types/crm";
import { Separator } from "@/components/ui/separator";

export const NewLeadsPage = () => {
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

  const stats = [
    {
      icon: <CheckCircle2 className="h-8 w-8 text-emerald-500" />,
      title: "Leads qualifiés",
      description: "Vérifiés à 100%"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      title: "32% conversion",
      description: "Taux moyen"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: "Garantie satisfait",
      description: "Ou remboursé"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto space-y-8 py-8">
        <div className="glass-panel p-8 space-y-8 animate-fadeIn">
          {/* Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold gradient-text">
                Nouveaux Leads
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Découvrez tous les leads qualifiés disponibles pour votre région. 
                Nos leads sont soigneusement sélectionnés et vérifiés pour assurer 
                une qualité optimale.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="p-4 bg-background/40 border-primary/20">
                    <div className="flex flex-col items-center text-center space-y-2">
                      {stat.icon}
                      <h3 className="font-semibold text-lg">{stat.title}</h3>
                      <p className="text-sm text-muted-foreground">{stat.description}</p>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Selected Leads Summary */}
              {selectedLeads.length > 0 && (
                <Card className="p-4 bg-primary/10 border-primary/20">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-lg">
                        {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} sélectionné{selectedLeads.length > 1 ? 's' : ''}
                      </p>
                      <p className="text-muted-foreground">
                        Total: {selectedLeads.reduce((sum, lead) => sum + lead.price, 0)}€
                      </p>
                    </div>
                    <Button 
                      onClick={handlePurchaseLeads}
                      className="bg-primary hover:bg-primary-dark"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Acheter les leads
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            {/* Prepaid Balance Card */}
            <div className="w-full max-w-md mx-auto lg:ml-auto">
              <PrepaidBalance balance={150} />
            </div>
          </div>

          <Separator className="bg-primary/10" />

          {/* Leads Table */}
          <Card className="glass-panel p-6 animate-fadeIn">
            <LeadsList 
              leads={mockAvailableLeads} 
              onLeadSelect={handleLeadSelect}
              selectedLeads={selectedLeads}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};