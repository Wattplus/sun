import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, MessageSquare, CheckCircle, TrendingUp, Search, Filter, CreditCard } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { mockInstallers } from "@/components/admin/InstallerManagement"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useCallback, useMemo } from "react"
import { Installer } from "@/types/crm"

export function InstallerDirectory() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedZone, setSelectedZone] = useState<string>("all")
  const [minConversionRate, setMinConversionRate] = useState<string>("all")

  // Get unique zones from all installers
  const allZones = useMemo(() => {
    return Array.from(
      new Set(
        mockInstallers
          .filter(installer => installer.status === "active")
          .flatMap(installer => installer.zones)
      )
    ).sort()
  }, [])

  // Handle contact request with animation feedback
  const handleContactRequest = useCallback((installer: Installer) => {
    const button = document.querySelector(`button[data-installer-id="${installer.id}"]`)
    if (button) {
      button.classList.add('animate-pulse')
      setTimeout(() => button.classList.remove('animate-pulse'), 1000)
    }

    toast({
      title: "Demande envoyée",
      description: `Votre demande de contact avec ${installer.companyName} a été enregistrée. L'installateur vous contactera prochainement.`,
      duration: 5000,
    })
  }, [toast])

  const handleInstallerSignup = () => {
    toast({
      title: "Inscription Installateur",
      description: "Vous allez être redirigé vers le formulaire d'inscription installateur.",
      duration: 5000,
    })
    // Add navigation logic here when the installer signup page is ready
  }

  // Filter installers based on search criteria
  const filteredInstallers = useMemo(() => {
    return mockInstallers
      .filter(installer => installer.status === "active")
      .filter(installer => 
        searchTerm === "" || 
        installer.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(installer =>
        selectedZone === "all" || installer.zones.includes(selectedZone)
      )
      .filter(installer =>
        minConversionRate === "all" || installer.conversionRate >= parseInt(minConversionRate)
      )
  }, [searchTerm, selectedZone, minConversionRate])

  // Render installer card
  const renderInstallerCard = useCallback((installer: Installer) => (
    <Card 
      key={installer.id} 
      className="glass-panel card-hover border-0 transform transition-all duration-300 hover:scale-102"
    >
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                {installer.companyName}
              </h3>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{installer.zones.join(", ")}</span>
              </div>
            </div>
            <Badge variant="outline" className="bg-primary/10 border-primary/20 animate-fade-in">
              <Star className="w-4 h-4 mr-1 text-primary" />
              {installer.conversionRate}%
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-300">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span>
                <strong className="text-white">{installer.leadsAssigned}</strong> projets réalisés
              </span>
            </div>
          </div>
          
          <Button 
            className="w-full glass-button group relative overflow-hidden"
            onClick={() => handleContactRequest(installer)}
            data-installer-id={installer.id}
          >
            <MessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="ml-2">Demander un contact</span>
          </Button>
        </div>
      </div>
    </Card>
  ), [handleContactRequest])

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="glass-panel p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-3xl font-bold gradient-text">Annuaire des Installateurs</h2>
              <p className="text-gray-300 mt-2">
                Découvrez nos installateurs certifiés. Vous pouvez demander à être mis en relation avec eux directement depuis cette page.
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleInstallerSignup}
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            Devenir Installateur Certifié
          </Button>
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
              <SelectItem value="all">Toutes les zones</SelectItem>
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
              <SelectItem value="all">Tous les taux</SelectItem>
              <SelectItem value="50">50% et plus</SelectItem>
              <SelectItem value="60">60% et plus</SelectItem>
              <SelectItem value="70">70% et plus</SelectItem>
              <SelectItem value="80">80% et plus</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredInstallers.map(renderInstallerCard)}
        </div>

        {filteredInstallers.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucun installateur ne correspond à vos critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  )
}