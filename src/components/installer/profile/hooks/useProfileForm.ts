import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"

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
  const [formData, setFormData] = useState<ProfileFormData>({
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
  })

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
            certifications: installer.certifications as ProfileFormData['certifications'] || {
              qualiPV: false,
              rge: false,
              qualibat: false
            },
            installationTypes: installer.installation_types as ProfileFormData['installationTypes'] || {
              residential: false,
              commercial: false,
              industrial: false
            },
            maintenanceServices: installer.maintenance_services || false,
          })

          if (installer.visibility_settings) {
            setVisibilityOptions(installer.visibility_settings as VisibilityOptions)
          }
        }
      } catch (error) {
        console.error('Error loading installer data:', error)
      }
    }

    loadInstallerData()
  }, [])

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
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("User not found")

      const { data: installer, error: installerError } = await supabase
        .from('installers')
        .select()
        .eq('user_id', user.id)
        .single()

      if (installerError) throw installerError

      const { error: updateError } = await supabase
        .from('installers')
        .update({
          service_area: formData.service_area,
          company_name: formData.company,
          contact_name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          website: formData.website,
          description: formData.description,
          experience_years: parseInt(formData.experience),
          panel_brands: formData.panelBrands.split(',').map(brand => brand.trim()),
          inverter_brands: formData.inverterBrands.split(',').map(brand => brand.trim()),
          warranty_years: parseInt(formData.guaranteeYears),
          certifications: formData.certifications,
          installation_types: formData.installationTypes,
          maintenance_services: formData.maintenanceServices,
          visibility_settings: visibilityOptions
        })
        .eq('id', installer.id)

      if (updateError) throw updateError
    } catch (error) {
      console.error('Error updating profile:', error)
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