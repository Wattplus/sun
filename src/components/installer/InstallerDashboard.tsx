import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, Star, MessageSquare, TrendingUp, Package, Users, Calendar } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function InstallerDashboard() {
  const { toast } = useToast()

  const mockStats = {
    leadsAvailable: 12,
    activeProjects: 5,
    completedProjects: 45,
    conversionRate: 68,
  }

  const mockLeads = [
    {
      id: "1",
      clientName: "Thomas Martin",
      projectType: "Installation Panneaux Solaires",
      location: "Paris (75)",
      date: "2024-03-20",
      status: "new"
    },
    {
      id: "2",
      clientName: "Marie Dubois",
      projectType: "Pompe à Chaleur",
      location: "Lyon (69)",
      date: "2024-03-19",
      status: "contacted"
    }
  ]

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
              <p className="text-2xl font-bold">{mockStats.leadsAvailable}</p>
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
              <p className="text-2xl font-bold">{mockStats.activeProjects}</p>
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
              <p className="text-2xl font-bold">{mockStats.completedProjects}</p>
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
              <p className="text-2xl font-bold">{mockStats.conversionRate}%</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-background/50 backdrop-blur-md border-primary/20">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Leads Récents</h2>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {mockLeads.map((lead) => (
                <Card key={lead.id} className="p-4 border border-primary/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{lead.clientName}</h3>
                      <p className="text-sm text-muted-foreground">{lead.projectType}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm">{lead.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline" className="bg-primary/10">
                        {lead.status === 'new' ? 'Nouveau' : 'Contacté'}
                      </Badge>
                      <Button size="sm" variant="outline" className="border-primary/20">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contacter
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </Card>
    </div>
  )
}