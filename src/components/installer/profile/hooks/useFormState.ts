import { useState } from "react"
import type { InstallerFormData, VisibilityOptions } from "../types/installer"

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
    qualibat: false,
  },
  installationTypes: {
    residential: false,
    commercial: false,
    industrial: false,
  },
  maintenanceServices: false,
  address: "",
  postal_code: "",
  city: "",
  visibility_settings: {
    showPhoneNumber: true,
    highlightProfile: false,
    acceptDirectMessages: true,
    showCertifications: true,
  }
}

export const useFormState = () => {
  const [formData, setFormData] = useState<InstallerFormData>(defaultFormData)
  const [visibilityOptions, setVisibilityOptions] = useState<VisibilityOptions>({
    showPhoneNumber: true,
    highlightProfile: false,
    acceptDirectMessages: true,
    showCertifications: true,
  })

  return {
    formData,
    setFormData,
    visibilityOptions,
    setVisibilityOptions,
  }
}