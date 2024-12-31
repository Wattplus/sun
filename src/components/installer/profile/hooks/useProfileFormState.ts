import { useState } from "react"
import type { InstallerFormData, VisibilitySettings } from "@/types/installer"

const defaultVisibilitySettings: VisibilitySettings = {
  showPhoneNumber: true,
  highlightProfile: false,
  acceptDirectMessages: true,
  showCertifications: true
}

const defaultFormData: InstallerFormData = {
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
  address: "",
  postal_code: "",
  city: "",
  visibility_settings: defaultVisibilitySettings
}

export const useProfileFormState = () => {
  const [formData, setFormData] = useState<InstallerFormData>(defaultFormData)
  const [visibilitySettings, setVisibilitySettings] = useState<VisibilitySettings>(defaultVisibilitySettings)

  return {
    formData,
    setFormData,
    visibilitySettings,
    setVisibilitySettings,
    defaultFormData
  }
}