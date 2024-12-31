import type { Json } from "@/integrations/supabase/types"

export interface VisibilitySettings {
  showPhoneNumber: boolean
  highlightProfile: boolean
  acceptDirectMessages: boolean
  showCertifications: boolean
}

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

export interface InstallerFormData {
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
  certifications: Certifications
  installationTypes: InstallationTypes
  maintenanceServices: boolean
  address: string
  postal_code: string
  city: string
  visibility_settings: VisibilitySettings
}

export interface DatabaseInstallerData {
  id: string
  user_id: string
  company_name: string
  contact_name: string
  phone: string
  address: string
  postal_code: string
  city?: string
  service_area: string[]
  credits: number
  verified: boolean
  siret?: string
  website?: string
  description?: string
  experience_years?: number
  panel_brands?: string[]
  inverter_brands?: string[]
  warranty_years?: number
  certifications: Json
  installation_types: Json
  maintenance_services?: boolean
  visibility_settings: Json
  created_at?: string
  subscription_plan?: string
  profile_views?: number
  conversion_rate?: number
  satisfied_clients?: number
}

export const convertFormToDbFormat = (formData: InstallerFormData, userId: string): Partial<DatabaseInstallerData> => ({
  user_id: userId,
  company_name: formData.company,
  contact_name: `${formData.firstName} ${formData.lastName}`,
  phone: formData.phone,
  address: formData.address,
  postal_code: formData.postal_code,
  city: formData.city,
  website: formData.website,
  description: formData.description,
  experience_years: parseInt(formData.experience) || null,
  panel_brands: formData.panelBrands.split(",").map(brand => brand.trim()),
  inverter_brands: formData.inverterBrands.split(",").map(brand => brand.trim()),
  warranty_years: parseInt(formData.guaranteeYears) || null,
  service_area: formData.service_area,
  certifications: formData.certifications as unknown as Json,
  installation_types: formData.installationTypes as unknown as Json,
  maintenance_services: formData.maintenanceServices,
  visibility_settings: formData.visibility_settings as unknown as Json,
  siret: formData.siret
})

export const convertDbToFormFormat = (dbData: DatabaseInstallerData, email: string): InstallerFormData => {
  const [firstName, lastName] = (dbData.contact_name || "").split(" ")
  
  return {
    firstName: firstName || "",
    lastName: lastName || "",
    email: email,
    phone: dbData.phone || "",
    company: dbData.company_name || "",
    siret: dbData.siret || "",
    website: dbData.website || "",
    description: dbData.description || "",
    experience: dbData.experience_years?.toString() || "",
    panelBrands: Array.isArray(dbData.panel_brands) ? dbData.panel_brands.join(", ") : "",
    inverterBrands: Array.isArray(dbData.inverter_brands) ? dbData.inverter_brands.join(", ") : "",
    guaranteeYears: dbData.warranty_years?.toString() || "",
    service_area: dbData.service_area || [],
    certifications: dbData.certifications as unknown as Certifications,
    installationTypes: dbData.installation_types as unknown as InstallationTypes,
    maintenanceServices: dbData.maintenance_services || false,
    address: dbData.address || "",
    postal_code: dbData.postal_code || "",
    city: dbData.city || "",
    visibility_settings: dbData.visibility_settings as unknown as VisibilitySettings
  }
}