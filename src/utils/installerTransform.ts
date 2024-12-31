import type { Json } from "@/types/installer"

export type RawInstallerData = {
  address?: string
  certifications?: Json
  city?: string
  company_name?: string
  contact_name?: string
  email?: string
  phone?: string
  siret?: string
  website?: string
  experience_years?: number
  panel_brands?: string[]
  inverter_brands?: string[]
  warranty_years?: number
  installation_types?: {
    residential?: boolean
    commercial?: boolean
    industrial?: boolean
  }
  maintenance_services?: boolean
  service_area?: string[]
}

export function transformDatabaseToForm(data: RawInstallerData) {
  const [firstName = "", lastName = ""] = data.contact_name?.split(" ") || []
  
  return {
    firstName,
    lastName,
    email: data.email || "",
    phone: data.phone || "",
    company: data.company_name || "",
    company_name: data.company_name || "",
    contact_name: data.contact_name || "",
    siret: data.siret || "",
    website: data.website || "",
    description: "",
    address: data.address || "",
    postal_code: "",
    city: data.city || "",
    service_area: data.service_area || [],
    experience: String(data.experience_years || ""),
    experience_years: data.experience_years || 0,
    panelBrands: (data.panel_brands || []).join(", "),
    panel_brands: data.panel_brands || [],
    inverterBrands: (data.inverter_brands || []).join(", "),
    inverter_brands: data.inverter_brands || [],
    guaranteeYears: String(data.warranty_years || ""),
    warranty_years: data.warranty_years || 0,
    certifications: {
      qualiPV: false,
      rge: false,
      qualibat: false,
      ...data.certifications
    },
    installation_types: {
      residential: false,
      commercial: false,
      industrial: false,
      ...data.installation_types
    },
    installationTypes: {
      residential: false,
      commercial: false,
      industrial: false,
      ...data.installation_types
    },
    maintenance_services: data.maintenance_services || false,
    maintenanceServices: data.maintenance_services || false,
    visibility_settings: {
      showPhoneNumber: true,
      highlightProfile: false,
      acceptDirectMessages: true,
      showCertifications: true
    }
  }
}

export function validateInstallerData(data: RawInstallerData) {
  const errors: string[] = []

  if (!data.company_name) {
    errors.push("Le nom de l'entreprise est requis")
  }
  if (!data.contact_name) {
    errors.push("Le nom du contact est requis")
  }
  if (!data.phone) {
    errors.push("Le numéro de téléphone est requis")
  }
  if (!data.siret) {
    errors.push("Le numéro SIRET est requis")
  }

  return errors
}