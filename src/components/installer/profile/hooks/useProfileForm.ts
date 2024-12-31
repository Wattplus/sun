import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { 
  ProfileFormData, 
  Certifications, 
  InstallationTypes, 
  VisibilityOptions 
} from "../types/profile"

const defaultFormData: ProfileFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  siret: "",
  website: "",
  description: "",
  experience: "",
  panelBrands: "",
  inverterBrands: "",
  guaranteeYears: "",
  service_area: [],
  certifications: {
    qualiPV: false,
    rge: false,
    qualibat: false
  },
  installationTypes: {
    residential: false,
    commercial: false,
    industrial: false
  },
  maintenanceServices: false,
}

const defaultVisibilityOptions: VisibilityOptions = {
  showPhoneNumber: true,
  highlightProfile: false,
  acceptDirectMessages: true,
  showCertifications: true,
}

export const useProfileForm = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState<ProfileFormData>(defaultFormData)
  const [visibilityOptions, setVisibilityOptions] = useState<VisibilityOptions>(defaultVisibilityOptions)

  useEffect(() => {
    const loadInstallerData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data: installer, error } = await supabase
          .from('installers')
          .select()
          .eq('user_id', user.id)
          .single()

        if (error) throw error

        if (installer) {
          const [firstName, lastName] = (installer.contact_name || "").split(" ")
          
          setFormData({
            firstName: firstName || "",
            lastName: lastName || "",
            email: user.email || "",
            phone: installer.phone || "",
            company: installer.company_name || "",
            siret: "",
            website: installer.website || "",
            description: installer.description || "",
            experience: installer.experience_years?.toString() || "",
            panelBrands: Array.isArray(installer.panel_brands) ? installer.panel_brands.join(', ') : "",
            inverterBrands: Array.isArray(installer.inverter_brands) ? installer.inverter_brands.join(', ') : "",
            guaranteeYears: installer.warranty_years?.toString() || "",
            service_area: installer.service_area || [],
            certifications: installer.certifications as Certifications || defaultFormData.certifications,
            installationTypes: installer.installation_types as InstallationTypes || defaultFormData.installationTypes,
            maintenanceServices: installer.maintenance_services || false,
          })

          if (installer.visibility_settings) {
            setVisibilityOptions(installer.visibility_settings as VisibilityOptions || defaultVisibilityOptions)
          }
        }
      } catch (error) {
        console.error('Error loading installer data:', error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les données de l'installateur",
          variant: "destructive"
        })
      }
    }

    loadInstallerData()
  }, [toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleCheckboxChange = (field: string, checked: boolean) => {
    if (field.includes('.')) {
      const [category, item] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...(prev[category as keyof typeof prev] as Record<string, boolean>),
          [item]: checked
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: checked
      }))
    }
  }

  const handleToggleChange = (field: keyof VisibilityOptions, checked: boolean) => {
    setVisibilityOptions(prev => ({
      ...prev,
      [field]: checked,
    }))
  }

  const handleZonesChange = (zones: string[]) => {
    setFormData(prev => ({
      ...prev,
      service_area: zones
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("User not found")

      const { error: updateError } = await supabase
        .from('installers')
        .update({
          contact_name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          company_name: formData.company,
          website: formData.website,
          description: formData.description,
          experience_years: parseInt(formData.experience),
          panel_brands: formData.panelBrands.split(',').map(brand => brand.trim()),
          inverter_brands: formData.inverterBrands.split(',').map(brand => brand.trim()),
          warranty_years: parseInt(formData.guaranteeYears),
          service_area: formData.service_area,
          certifications: formData.certifications,
          installation_types: formData.installationTypes,
          maintenance_services: formData.maintenanceServices,
          visibility_settings: visibilityOptions
        })
        .eq('user_id', user.id)

      if (updateError) throw updateError

      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées avec succès.",
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil.",
        variant: "destructive"
      })
    }
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