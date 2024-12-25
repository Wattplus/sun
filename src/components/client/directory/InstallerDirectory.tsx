import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, MessageSquare, Phone, Mail, CheckCircle } from "lucide-react"
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
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-white">Annuaire des Installateurs</h2>
        </div>
        <p className="text-gray-300 mb-6">
          Découvrez nos installateurs certifiés. Vous pouvez demander à être mis en relation avec eux directement depuis cette page.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockInstallers.filter(installer => installer.status === "active").map((installer) => (
            <Card 
              key={installer.id} 
              className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      {installer.companyName}
                      <Badge variant="outline" className="bg-primary/10">
                        <Star className="w-4 h-4 mr-1" />
                        {installer.conversionRate}%
                      </Badge>
                    </h3>
                    <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
                      <MapPin className="w-4 h-4" />
                      <span>{installer.zones.join(", ")}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="text-sm space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Phone className="w-4 h-4" />
                      <span>{installer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail className="w-4 h-4" />
                      <span>{installer.email}</span>
                    </div>
                    <div className="text-gray-300">
                      <strong className="text-white">Projets réalisés:</strong> {installer.leadsAssigned}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full gap-2 glass-button" 
                    onClick={() => handleContactRequest(installer.companyName)}
                  >
                    <MessageSquare className="w-4 h-4" />
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