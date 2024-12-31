import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import type { Json } from "@/integrations/supabase/types"

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  siret: string;
  website: string;
  description: string;
  experience: string;
  panelBrands: string;
  inverterBrands: string;
  guaranteeYears: string;
  service_area: string[];
  certifications: {
    qualiPV: boolean;
    rge: boolean;
    qualibat: boolean;
  };
  installationTypes: {
    residential: boolean;
    commercial: boolean;
    industrial: boolean;
  };
  maintenanceServices: boolean;
}

export interface VisibilityOptions {
  showPhoneNumber: boolean;
  highlightProfile: boolean;
  acceptDirectMessages: boolean;
  showCertifications: boolean;
}

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
    qualibat: false,
  },
  installationTypes: {
    residential: false,
    commercial: false,
    industrial: false,
  },
  maintenanceServices: false,
}

export const useProfileForm = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState<ProfileFormData>(defaultFormData)
  const [visibilityOptions, setVisibilityOptions] = useState<VisibilityOptions>({
    showPhoneNumber: true,
    highlightProfile: false,
    acceptDirectMessages: true,
    showCertifications: true,
  })

  useEffect(() => {
    const loadInstallerData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data: installer, error } = await supabase
          .from('installers')
          .select()
          .eq('user_id', user.id)
          .maybeSingle()

        if (error) throw error

        if (installer) {
          const [firstName, lastName] = (installer.contact_name || "").split(" ")
          
          setFormData({
            firstName: firstName || "",
            lastName: lastName || "",
            email: user.email || "",
            phone: installer.phone || "",
            company: installer.company_name || "",
            siret: installer.siret || "",
            website: installer.website || "",
            description: installer.description || "",
            experience: installer.experience_years?.toString() || "",
            panelBrands: Array.isArray(installer.panel_brands) ? installer.panel_brands.join(', ') : "",
            inverterBrands: Array.isArray(installer.inverter_brands) ? installer.inverter_brands.join(', ') : "",
            guaranteeYears: installer.warranty_years?.toString() || "",
            service_area: installer.service_area || [],
            certifications: installer.certifications as ProfileFormData['certifications'] || defaultFormData.certifications,
            installationTypes: installer.installation_types as ProfileFormData['installationTypes'] || defaultFormData.installationTypes,
            maintenanceServices: installer.maintenance_services || false,
          })

          if (installer.visibility_settings) {
            setVisibilityOptions(installer.visibility_settings as VisibilityOptions)
          }
        } else {
          // If no installer record exists, keep the default values
          toast({
            title: "Profil non trouvé",
            description: "Veuillez remplir vos informations professionnelles",
          })
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

  const handleToggleChange = (field: keyof VisibilityOptions) => {
    setVisibilityOptions(prev => ({
      ...prev,
      [field]: !prev[field],
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

      const installerData = {
        user_id: user.id,
        contact_name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        company_name: formData.company,
        website: formData.website,
        description: formData.description,
        experience_years: parseInt(formData.experience) || null,
        panel_brands: formData.panelBrands.split(',').map(brand => brand.trim()),
        inverter_brands: formData.inverterBrands.split(',').map(brand => brand.trim()),
        warranty_years: parseInt(formData.guaranteeYears) || null,
        service_area: formData.service_area,
        certifications: formData.certifications,
        installation_types: formData.installationTypes,
        maintenance_services: formData.maintenanceServices,
        visibility_settings: visibilityOptions
      }

      const { data: existingInstaller } = await supabase
        .from('installers')
        .select()
        .eq('user_id', user.id)
        .maybeSingle()

      let error
      if (existingInstaller) {
        // Update existing installer
        const { error: updateError } = await supabase
          .from('installers')
          .update(installerData)
          .eq('user_id', user.id)
        error = updateError
      } else {
        // Create new installer
        const { error: insertError } = await supabase
          .from('installers')
          .insert([installerData])
        error = insertError
      }

      if (error) throw error

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

export type { ProfileFormData, VisibilityOptions }
