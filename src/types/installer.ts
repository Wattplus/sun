import type { Database } from '@/lib/database.types'

export type Json = Database['public']['Tables']['installers']['Row']['certifications']

export interface Certifications {
  qualiPV: boolean
  rge: boolean
  qualibat: boolean
}

export interface InstallationTypes {
  residential: boolean
  commercial: boolean
  industrial: boolean
}

export interface VisibilitySettings {
  showPhoneNumber: boolean
  highlightProfile: boolean
  acceptDirectMessages: boolean
  showCertifications: boolean
}

export interface InstallerFormData {
  // Basic Information
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  company_name: string
  contact_name: string
  siret: string
  website: string
  description: string

  // Address
  address: string
  postal_code: string
  city: string
  service_area: string[]

  // Technical Information
  experience: string
  experience_years: number
  panelBrands: string
  panel_brands: string[]
  inverterBrands: string
  inverter_brands: string[]
  guaranteeYears: string
  warranty_years: number

  // Certifications and Installation Types
  certifications: Certifications
  installation_types: InstallationTypes
  installationTypes: InstallationTypes
  maintenance_services: boolean
  maintenanceServices: boolean
  visibility_settings: VisibilitySettings
}

export interface DatabaseInstallerData {
  id: string
  user_id: string
  company_name: string
  contact_name: string
  email: string
  phone: string
  siret: string
  address: string
  postal_code: string
  city: string
  service_area: string[]
  credits: number
  verified: boolean
  created_at: string
  website: string
  description: string
  experience_years: number
  panel_brands: string[]
  inverter_brands: string[]
  warranty_years: number
  certifications: Certifications
  installation_types: InstallationTypes
  maintenance_services: boolean
  visibility_settings: VisibilitySettings
  subscription_plan: string
  profile_views: number
  conversion_rate: number
  satisfied_clients: number
}

export const defaultFormData: InstallerFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  company_name: "",
  contact_name: "",
  siret: "",
  website: "",
  description: "",
  address: "",
  postal_code: "",
  city: "",
  service_area: [],
  experience: "0",
  experience_years: 0,
  panelBrands: "",
  panel_brands: [],
  inverterBrands: "",
  inverter_brands: [],
  guaranteeYears: "0",
  warranty_years: 0,
  certifications: {
    qualiPV: false,
    rge: false,
    qualibat: false
  },
  installation_types: {
    residential: false,
    commercial: false,
    industrial: false
  },
  installationTypes: {
    residential: false,
    commercial: false,
    industrial: false
  },
  maintenance_services: false,
  maintenanceServices: false,
  visibility_settings: {
    showPhoneNumber: true,
    highlightProfile: false,
    acceptDirectMessages: true,
    showCertifications: true
  }
}

export const convertDbToFormFormat = (data: DatabaseInstallerData): InstallerFormData => {
  const [firstName = "", lastName = ""] = (data.contact_name || "").split(" ")
  
  return {
    firstName,
    lastName,
    email: data.email,
    phone: data.phone,
    company: data.company_name,
    company_name: data.company_name,
    contact_name: data.contact_name,
    siret: data.siret,
    address: data.address,
    postal_code: data.postal_code,
    city: data.city,
    website: data.website || "",
    description: data.description || "",
    service_area: data.service_area,
    experience: String(data.experience_years || 0),
    experience_years: data.experience_years || 0,
    panelBrands: (data.panel_brands || []).join(", "),
    panel_brands: data.panel_brands || [],
    inverterBrands: (data.inverter_brands || []).join(", "),
    inverter_brands: data.inverter_brands || [],
    guaranteeYears: String(data.warranty_years || 0),
    warranty_years: data.warranty_years || 0,
    certifications: data.certifications,
    installation_types: data.installation_types,
    installationTypes: data.installation_types,
    maintenance_services: data.maintenance_services,
    maintenanceServices: data.maintenance_services,
    visibility_settings: data.visibility_settings
  }
}

export const convertFormToDbFormat = (formData: InstallerFormData): Omit<DatabaseInstallerData, 'id' | 'user_id' | 'created_at' | 'credits' | 'verified' | 'conversion_rate' | 'profile_views' | 'satisfied_clients' | 'subscription_plan'> => {
  return {
    company_name: formData.company_name,
    contact_name: `${formData.firstName} ${formData.lastName}`.trim(),
    email: formData.email,
    phone: formData.phone,
    siret: formData.siret,
    address: formData.address,
    postal_code: formData.postal_code,
    city: formData.city,
    website: formData.website,
    description: formData.description,
    service_area: formData.service_area,
    experience_years: Number(formData.experience) || formData.experience_years,
    panel_brands: formData.panelBrands.split(",").map(s => s.trim()),
    inverter_brands: formData.inverterBrands.split(",").map(s => s.trim()),
    warranty_years: Number(formData.guaranteeYears) || formData.warranty_years,
    certifications: formData.certifications,
    installation_types: formData.installation_types,
    maintenance_services: formData.maintenance_services,
    visibility_settings: formData.visibility_settings
  }
}