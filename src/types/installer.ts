import type { Database } from '@/lib/database.types'

export type Json = Database['public']['Tables']['installers']['Row']['certifications']

export interface Certifications {
  qualiPV: boolean;
  rge: boolean;
  qualibat: boolean;
}

export interface InstallationTypes {
  residential: boolean;
  commercial: boolean;
  industrial: boolean;
}

export interface VisibilitySettings {
  showPhoneNumber: boolean;
  highlightProfile: boolean;
  acceptDirectMessages: boolean;
  showCertifications: boolean;
}

export interface InstallerFormData {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  siret: string;
  address: string;
  postal_code: string;
  city: string;
  website: string;
  description: string;
  service_area: string[];
  experience_years: number;
  panel_brands: string[];
  inverter_brands: string[];
  warranty_years: number;
  certifications: Certifications;
  installation_types: InstallationTypes;
  maintenance_services: boolean;
  visibility_settings: VisibilitySettings;
}

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
  city: string;
  website: string | null;
  description: string | null;
  service_area: string[];
  experience_years: number | null;
  panel_brands: string[] | null;
  inverter_brands: string[] | null;
  warranty_years: number | null;
  certifications: Certifications;
  installation_types: InstallationTypes;
  maintenance_services: boolean;
  visibility_settings: VisibilitySettings;
  credits: number;
  verified: boolean;
  created_at?: string;
  subscription_plan?: string;
  profile_views?: number;
  conversion_rate?: number;
  satisfied_clients?: number;
}

export const convertDbToFormFormat = (data: DatabaseInstallerData): InstallerFormData => {
  return {
    company_name: data.company_name,
    contact_name: data.contact_name,
    email: data.email,
    phone: data.phone,
    siret: data.siret,
    address: data.address,
    postal_code: data.postal_code,
    city: data.city,
    website: data.website || "",
    description: data.description || "",
    service_area: data.service_area,
    experience_years: data.experience_years || 0,
    panel_brands: data.panel_brands || [],
    inverter_brands: data.inverter_brands || [],
    warranty_years: data.warranty_years || 0,
    certifications: data.certifications,
    installation_types: data.installation_types,
    maintenance_services: data.maintenance_services,
    visibility_settings: data.visibility_settings
  };
};

export const convertFormToDbFormat = (formData: InstallerFormData, userId: string): Partial<DatabaseInstallerData> => {
  return {
    user_id: userId,
    ...formData
  };
};