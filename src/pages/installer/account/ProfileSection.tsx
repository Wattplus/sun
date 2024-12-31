import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { ProfileStats } from "@/components/installer/profile/ProfileStats"
import { ProfileVisibilityOptions } from "@/components/installer/profile/ProfileVisibilityOptions"
import { PremiumFeatures } from "@/components/installer/profile/PremiumFeatures"
import { BasicInfoSection } from "@/components/installer/profile/sections/BasicInfoSection"
import { SolarSpecificSection } from "@/components/installer/profile/sections/SolarSpecificSection"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"

export const ProfileSection = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    company: "Solar Pro",
    siret: "123 456 789 00012",
    website: "www.solarpro.fr",
    description: "Installateur photovoltaïque certifié avec plus de 10 ans d'expérience",
    experience: "10",
    panelBrands: "SunPower, LG, Panasonic",
    inverterBrands: "SMA, Fronius, Enphase",
    guaranteeYears: "20",
    interventionZones: "75, 92, 93, 94",
    certifications: {
      qualiPV: true,
      rge: true,
      qualibat: true
    },
    installationTypes: {
      residential: true,
      commercial: true,
      industrial: false
    },
    maintenanceServices: true,
  })

  const [visibilityOptions, setVisibilityOptions] = useState({
    showPhoneNumber: true,
    highlightProfile: false,
    acceptDirectMessages: true,
    showCertifications: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleCheckboxChange = (field: string, checked: boolean) => {
    if (field.includes('.')) {
      const [category, item] = field.split('.')
      setFormData({
        ...formData,
        [category]: {
          ...formData[category],
          [item]: checked
        }
      })
    } else {
      setFormData({
        ...formData,
        [field]: checked
      })
    }
  }

  const handleToggleChange = (field: string, checked: boolean) => {
    setVisibilityOptions({
      ...visibilityOptions,
      [field]: checked,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    })
  }

  const handleAvatarUpload = () => {
    // Logique pour upload d'avatar à implémenter
    toast({
      title: "Upload de photo",
      description: "Fonctionnalité à venir",
    })
  }

  return (
    <div className="space-y-6">
      {/* En-tête du profil avec avatar */}
      <Card className="p-6 bg-secondary/80 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute bottom-0 right-0 bg-secondary hover:bg-secondary-dark"
              onClick={handleAvatarUpload}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{formData.company}</h2>
            <p className="text-white/60">{formData.description}</p>
          </div>
        </div>
      </Card>

      {/* Statistiques */}
      <ProfileStats />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations de base */}
        <BasicInfoSection formData={formData} handleChange={handleChange} />
        
        {/* Informations photovoltaïques */}
        <SolarSpecificSection 
          formData={formData} 
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
        />

        <Button 
          type="submit" 
          className="w-full md:w-auto bg-secondary hover:bg-secondary-dark text-white"
        >
          Enregistrer les modifications
        </Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Options Premium */}
        <PremiumFeatures />
        
        {/* Options de visibilité */}
        <ProfileVisibilityOptions 
          options={visibilityOptions}
          onToggle={handleToggleChange}
        />
      </div>
    </div>
  )
}