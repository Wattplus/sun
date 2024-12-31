import { Json } from '@/lib/database.types'

export interface DatabaseInstallerData {
  id: string
  user_id: string
  company_name: string
  contact_name: string
  phone: string
  address: string
  postal_code: string
  city: string
  service_area: string[]
  credits: number
  verified: boolean
  website?: string
  description?: string
  experience_years?: number
  panel_brands?: string[]
  inverter_brands?: string[]
  warranty_years?: number
  certifications: Json
  installation_types: Json
  maintenance_services: boolean
  visibility_settings: Json
  subscription_plan?: string
  profile_views?: number
  conversion_rate?: number
  satisfied_clients?: number
  created_at?: string
}