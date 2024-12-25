import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, MessageSquare, CheckCircle, TrendingUp, Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { mockInstallers } from "@/components/admin/InstallerManagement"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function InstallerDirectory() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedZone, setSelectedZone] = useState<string>("")
  const [minConversionRate, setMinConversionRate] = useState<string>("")

  const handleContactRequest = (installerName: string) => {
    toast({
      title: "Demande envoyée",
      description: `Votre demande de contact avec ${installerName} a été enregistrée. L'installateur vous contactera prochainement.`,
      duration: 5000,
    })
  }

  // Get unique zones from all installers
  const allZones = Array.from(
    new Set(
      mockInstallers
        .filter(installer => installer.status === "active")
        .flatMap(installer => installer.zones)
    )
  ).sort()

  const filteredInstallers = mockInstallers
    .filter(installer => installer.status === "active")
    .filter(installer => 
      searchTerm === "" || 
      installer.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(installer =>
      selectedZone === "" || installer.zones.includes(selectedZone)
    )
    .filter(installer =>
      minConversionRate === "" || installer.conversionRate >= parseInt(minConversionRate)
    )

  return (
    <div className="space-y-8">
      <div className="glass-panel p-8">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-3xl font-bold gradient-text">Annuaire des Installateurs</h2>
            <p className="text-gray-300 mt-2">
              Découvrez nos installateurs certifiés. Vous pouvez demander à être mis en relation avec eux directement depuis cette page.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un installateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
          
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Zone géographique" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les zones</SelectItem>
              {allZones.map(zone => (
                <SelectItem key={zone} value={zone}>{zone}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={minConversionRate} onValueChange={setMinConversionRate}>
            <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Taux de conversion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les taux</SelectItem>
              <SelectItem value="50">50% et plus</SelectItem>
              <SelectItem value="60">60% et plus</SelectItem>
              <SelectItem value="70">70% et plus</SelectItem>
              <SelectItem value="80">80% et plus</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredInstallers.map((installer) => (
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