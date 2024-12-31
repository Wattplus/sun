import type { Json } from "@/integrations/supabase/types"

export interface VisibilityOptions {
  showPhoneNumber: boolean
  highlightProfile: boolean
  acceptDirectMessages: boolean
  showCertifications: boolean
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
  address: string
  postal_code: string
  city: string
  visibility_settings: VisibilityOptions
}

export interface DatabaseInstallerData {
  id: string
  user_id: string
  company_name: string
  contact_name: string
  phone: string
  address: string
  postal_code: string
  service_area: string[]
  credits: number
  verified: boolean
  created_at: string
  city?: string
  website?: string
  description?: string
  experience_years?: number
  panel_brands?: string[]
  inverter_brands?: string[]
  warranty_years?: number
  certifications?: Json
  installation_types?: Json
  maintenance_services?: boolean
  visibility_settings?: Json
  siret?: string
}