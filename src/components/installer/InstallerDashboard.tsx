import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Star, MessageSquare, TrendingUp, Package, Users, Calendar, Euro } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const mockLeads = [
  {
    id: "1",
    projectType: "Installation Panneaux Solaires",
    city: "Paris",
    postalCode: "75001",
    budget: 15000,
    price: 50
  },
  {
    id: "2",
    projectType: "Pompe à chaleur",
    city: "Lyon",
    postalCode: "69001",
    budget: 12000,
    price: 45
  }
];

const mockMessages = [
  {
    id: "1",
    date: "2024-03-22",
    content: "Nouveau lead disponible dans votre région",
    read: false
  },
  {
    id: "2",
    date: "2024-03-20",
    content: "Votre achat de lead a été confirmé",
    read: true
  }
];

export function InstallerDashboard() {
  const { toast } = useToast();

  const handleBuyLead = (leadId: string) => {
    toast({
      title: "Lead acheté avec succès",
      description: "Vous pouvez maintenant voir les coordonnées complètes du contact.",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] bg-clip-text text-transparent">
          Tableau de Bord Installateur
        </h1>
        <Button variant="outline" className="border-[#9b87f5]/20 hover:border-[#9b87f5]/40">
          <Calendar className="h-4 w-4 mr-2 text-[#9b87f5]" />
          Planning
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-background/50 backdrop-blur-md border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Leads Disponibles</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-background/50 backdrop-blur-md border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Projets Actifs</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-background/50 backdrop-blur-md border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Projets Complétés</p>
              <p className="text-2xl font-bold">45</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-background/50 backdrop-blur-md border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Taux de Conversion</p>
              <p className="text-2xl font-bold">68%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Leads Disponibles */}
        <Card className="bg-background/50 backdrop-blur-md border-primary/20">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Leads Disponibles</h2>
              <Link to="/admin/marketplace">
                <Button variant="outline" size="sm">
                  Voir tout
                </Button>
              </Link>
            </div>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {mockLeads.map((lead) => (
                  <Card key={lead.id} className="p-4 border border-primary/10">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {lead.projectType}
                        </Badge>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{lead.city} ({lead.postalCode})</span>
                        </div>
                        <div className="mt-2 text-sm">
                          Budget estimé: {lead.budget.toLocaleString()}€
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleBuyLead(lead.id)}
                        className="flex items-center gap-1"
                      >
                        <Euro className="h-4 w-4" />
                        {lead.price}€
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>

        {/* Section Messages */}
        <Card className="bg-background/50 backdrop-blur-md border-primary/20">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Messages</h2>
              <Badge variant="secondary">
                {mockMessages.filter(m => !m.read).length} nouveaux
              </Badge>
            </div>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <Card 
                    key={message.id} 
                    className={`p-4 ${message.read ? 'bg-background' : 'bg-primary/5'} border-primary/10`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-muted-foreground">{message.date}</span>
                      {!message.read && (
                        <Badge variant="secondary" className="text-xs">
                          Nouveau
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>
      </div>
    </div>
  );
}