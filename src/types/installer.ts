import { Json } from '@supabase/supabase-js'

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
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Company Info
  company_name: string;
  contact_name: string;
  siret: string;
  address: string;
  postal_code: string;
  city: string;
  website: string;
  description: string;
  
  // Service Areas
  service_area: string[];
  
  // Experience & Equipment
  experience_years: number;
  panel_brands: string[];
  inverter_brands: string[];
  warranty_years: number;
  
  // Certifications & Services
  certifications: Certifications;
  installation_types: InstallationTypes;
  maintenance_services: boolean;
  visibility_settings: VisibilitySettings;
}

export interface DatabaseInstallerData extends InstallerFormData {
  id: string;
  user_id: string;
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
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    email: data.email || "",
    phone: data.phone || "",
    company_name: data.company_name || "",
    contact_name: data.contact_name || "",
    siret: data.siret || "",
    address: data.address || "",
    postal_code: data.postal_code || "",
    city: data.city || "",
    website: data.website || "",
    description: data.description || "",
    service_area: data.service_area || [],
    experience_years: data.experience_years || 0,
    panel_brands: data.panel_brands || [],
    inverter_brands: data.inverter_brands || [],
    warranty_years: data.warranty_years || 0,
    certifications: data.certifications || {
      qualiPV: false,
      rge: false,
      qualibat: false
    },
    installation_types: data.installation_types || {
      residential: false,
      commercial: false,
      industrial: false
    },
    maintenance_services: data.maintenance_services || false,
    visibility_settings: data.visibility_settings || {
      showPhoneNumber: true,
      highlightProfile: false,
      acceptDirectMessages: true,
      showCertifications: true
    }
  };
};

export const convertFormToDbFormat = (formData: InstallerFormData, userId: string): Partial<DatabaseInstallerData> => {
  return {
    user_id: userId,
    ...formData,
    // Convert complex objects to JSON for Supabase
    certifications: formData.certifications as unknown as Json,
    installation_types: formData.installation_types as unknown as Json,
    visibility_settings: formData.visibility_settings as unknown as Json
  };
};