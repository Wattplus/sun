import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"

interface ProfileFormData {
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

interface VisibilityOptions {
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
          setFormData({
            firstName: installer.contact_name?.split(' ')[0] || "",
            lastName: installer.contact_name?.split(' ')[1] || "",
            email: user.email || "",
            phone: installer.phone || "",
            company: installer.company_name || "",
            siret: "",  // Add SIRET if available in your database
            website: installer.website || "",
            description: installer.description || "",
            experience: installer.experience_years?.toString() || "",
            panelBrands: Array.isArray(installer.panel_brands) ? installer.panel_brands.join(', ') : "",
            inverterBrands: Array.isArray(installer.inverter_brands) ? installer.inverter_brands.join(', ') : "",
            guaranteeYears: installer.warranty_years?.toString() || "",
            service_area: installer.service_area || [],
            certifications: installer.certifications || {
              qualiPV: false,
              rge: false,
              qualibat: false
            },
            installationTypes: installer.installation_types || {
              residential: false,
              commercial: false,
              industrial: false
            },
            maintenanceServices: installer.maintenance_services || false,
          })

          if (installer.visibility_settings) {
            setVisibilityOptions(installer.visibility_settings)
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

  return {
    formData,
    visibilityOptions,
    handleChange,
    handleCheckboxChange,
    handleToggleChange,
    handleZonesChange
  }
}