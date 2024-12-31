import { Json, InstallationTypes, Certifications, VisibilitySettings } from './base';

export interface DatabaseInstallerData {
  id?: string;
  user_id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  siret: string;
  address: string;
  postal_code: string;
  city: string;
  website?: string | null;
  description?: string | null;
  experience_years?: number | null;
  panel_brands?: string[] | null;
  inverter_brands?: string[] | null;
  warranty_years?: number | null;
  service_area: string[];
  certifications: Certifications;
  installation_types: InstallationTypes;
  maintenance_services: boolean;
  visibility_settings: VisibilitySettings;
  credits?: number;
  verified?: boolean;
  created_at?: string;
  conversion_rate?: number;
  satisfied_clients?: number;
  profile_views?: number;
}