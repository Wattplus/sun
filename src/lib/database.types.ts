export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      installers: {
        Row: {
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
          city: string | null
          website: string | null
          description: string | null
          experience_years: number | null
          panel_brands: string[] | null
          inverter_brands: string[] | null
          warranty_years: number | null
          certifications: Json
          installation_types: Json
          maintenance_services: boolean
          visibility_settings: Json
          subscription_plan: string | null
          profile_views: number | null
          conversion_rate: number | null
          satisfied_clients: number | null
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          role: string
        }
      }
    }
  }
}