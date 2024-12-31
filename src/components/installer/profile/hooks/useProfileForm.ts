import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export interface ProfileFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  siret: string
  website: string
  description: string
  experience: string
  panelBrands: string
  inverterBrands: string
  guaranteeYears: string
  service_area: string[]
  interventionZones: string
  certifications: {
    qualiPV: boolean
    rge: boolean
    qualibat: boolean
  }
  installationTypes: {
    residential: boolean
    commercial: boolean
    industrial: boolean
  }
  maintenanceServices: boolean
}

export interface VisibilityOptions {
  showPhoneNumber: boolean
  highlightProfile: boolean
  acceptDirectMessages: boolean
  showCertifications: boolean
}

export const useProfileForm = () => {
  const { toast } = useToast()
  
  const [formData, setFormData] = useState<ProfileFormData>({
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
    service_area: ["75 - Paris", "92 - Hauts-de-Seine"],
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

  const [visibilityOptions, setVisibilityOptions] = useState<VisibilityOptions>({
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

  const handleZonesChange = (zones: string[]) => {
    setFormData({
      ...formData,
      service_area: zones
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    })
  }

  return {
    formData,
    visibilityOptions,
    handleChange,
    handleCheckboxChange,
    handleToggleChange,
    handleZonesChange,
    handleSubmit
  }
}