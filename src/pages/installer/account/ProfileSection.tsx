import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { ProfileStats } from "@/components/installer/profile/ProfileStats"
import { ProfileVisibilityOptions } from "@/components/installer/profile/ProfileVisibilityOptions"
import { PremiumFeatures } from "@/components/installer/profile/PremiumFeatures"
import { BasicInfoSection } from "@/components/installer/profile/sections/BasicInfoSection"
import { SolarSpecificSection } from "@/components/installer/profile/sections/SolarSpecificSection"

export const ProfileSection = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    siret: "",
    website: "",
    description: "",
    certifications: {
      qualiPV: false,
      rge: false,
      qualibat: false
    },
    experience: "",
    installationTypes: {
      residential: false,
      commercial: false,
      industrial: false
    },
    panelBrands: "",
    inverterBrands: "",
    guaranteeYears: "",
    maintenanceServices: false,
    interventionZones: "",
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

  return (
    <div className="space-y-6">
      <ProfileStats />

      <form onSubmit={handleSubmit} className="space-y-6">
        <BasicInfoSection formData={formData} handleChange={handleChange} />
        <SolarSpecificSection 
          formData={formData} 
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
        />

        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Description de votre entreprise
          </label>
          <textarea
            className="w-full h-32 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus-visible:border-white p-3"
            placeholder="Décrivez votre entreprise, vos services et votre expertise..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <Button type="submit" className="w-full md:w-auto">
          Enregistrer les modifications
        </Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PremiumFeatures />
        <ProfileVisibilityOptions 
          options={visibilityOptions}
          onToggle={handleToggleChange}
        />
      </div>
    </div>
  )
}