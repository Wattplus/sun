export interface Certifications {
  qualiPV: boolean;
  rge: boolean;
  qualibat: boolean;
  [key: string]: boolean;
}

export interface InstallationTypes {
  residential: boolean;
  commercial: boolean;
  industrial: boolean;
  [key: string]: boolean;
}

export interface VisibilitySettings {
  showPhoneNumber: boolean;
  highlightProfile: boolean;
  acceptDirectMessages: boolean;
  showCertifications: boolean;
  [key: string]: boolean;
}

export interface DatabaseInstallerData {
  id: string;
  user_id: string;
  company_name: string;
  contact_name: string;
  phone: string;
  address: string;
  postal_code: string;
  city: string;
  service_area: string[];
  credits: number;
  verified: boolean;
  website?: string;
  description?: string;
  experience_years?: number;
  panel_brands?: string[];
  inverter_brands?: string[];
  warranty_years?: number;
  certifications: Certifications;
  installation_types: InstallationTypes;
  maintenance_services: boolean;
  visibility_settings: VisibilitySettings;
  subscription_plan?: string;
  profile_views?: number;
  conversion_rate?: number;
  satisfied_clients?: number;
  created_at?: string;
}

export interface InstallerFormData {
  company_name: string;
  contact_name: string;
  phone: string;
  address: string;
  postal_code: string;
  city: string;
  service_area: string[];
  website: string;
  description: string;
  experience_years: number;
  panel_brands: string[];
  inverter_brands: string[];
  warranty_years: number;
  certifications: Certifications;
  installation_types: InstallationTypes;
  maintenance_services: boolean;
  visibility_settings: VisibilitySettings;
}

export const convertDbToFormFormat = (data: DatabaseInstallerData): InstallerFormData => {
  return {
    company_name: data.company_name || "",
    contact_name: data.contact_name || "",
    phone: data.phone || "",
    address: data.address || "",
    postal_code: data.postal_code || "",
    city: data.city || "",
    service_area: data.service_area || [],
    website: data.website || "",
    description: data.description || "",
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