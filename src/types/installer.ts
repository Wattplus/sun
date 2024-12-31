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

export interface InstallerData {
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
  certifications: Certifications
  installation_types: InstallationTypes
  maintenance_services: boolean
  visibility_settings: VisibilitySettings
  created_at?: string
  profile_views?: number
  conversion_rate?: number
  satisfied_clients?: number
}