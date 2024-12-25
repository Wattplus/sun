import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, MessageSquare, CheckCircle, TrendingUp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { mockInstallers } from "@/components/admin/InstallerManagement"

export function InstallerDirectory() {
  const { toast } = useToast()

  const handleContactRequest = (installerName: string) => {
    toast({
      title: "Demande envoyée",
      description: `Votre demande de contact avec ${installerName} a été enregistrée. L'installateur vous contactera prochainement.`,
      duration: 5000,
    })
  }

  return (
    <div className="space-y-8">
      <div className="glass-panel p-8">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-3xl font-bold gradient-text">Annuaire des Installateurs</h2>
            <p className="text-gray-300 mt-2">
              Découvrez nos installateurs certifiés. Vous pouvez demander à être mis en relation avec eux directement depuis cette page.
            </p>
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mockInstallers.filter(installer => installer.status === "active").map((installer) => (
            <Card 
              key={installer.id} 
              className="glass-panel card-hover border-0"
            >
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {installer.companyName}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{installer.zones.join(", ")}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 border-primary/20">
                      <Star className="w-4 h-4 mr-1 text-primary" />
                      {installer.conversionRate}%
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-300">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span><strong className="text-white">{installer.leadsAssigned}</strong> projets réalisés</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full glass-button group" 
                    onClick={() => handleContactRequest(installer.companyName)}
                  >
                    <MessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" />
                    Demander un contact
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}