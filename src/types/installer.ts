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

export interface DatabaseInstallerData {
  id: string
  user_id: string
  company_name: string
  contact_name: string
  phone: string
  address: string
  postal_code: string
  city?: string | null
  service_area: string[]
  credits: number
  verified: boolean
  siret?: string | null
  website?: string | null
  description?: string | null
  experience_years?: number | null
  panel_brands?: string[] | null
  inverter_brands?: string[] | null
  warranty_years?: number | null
  certifications: Json
  installation_types: Json
  maintenance_services?: boolean
  visibility_settings: Json
  created_at?: string
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