import { Json } from '@/lib/database.types'

export interface DatabaseInstallerData {
  id: string;
  user_id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  siret: string;
  address: string;
  postal_code: string;
  city: string | null;
  service_area: string[];
  credits: number;
  verified: boolean;
  website?: string | null;
  description?: string | null;
  experience_years?: number | null;
  panel_brands?: string[] | null;
  inverter_brands?: string[] | null;
  warranty_years?: number | null;
  certifications: Json;
  installation_types: Json;
  maintenance_services: boolean;
  visibility_settings: Json;
  subscription_plan?: string | null;
  profile_views?: number | null;
  conversion_rate?: number | null;
  satisfied_clients?: number | null;
  created_at?: string | null;
  status: string;
}