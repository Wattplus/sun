export interface VisibilitySettings {
  showPhoneNumber: boolean;
  highlightProfile: boolean;
  acceptDirectMessages: boolean;
  showCertifications: boolean;
}

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

export interface InstallerFormData {
  user_id: string;
  company_name: string;
  contact_name: string;
  phone: string;
  address: string;
  postal_code: string;
  city: string;
  service_area: string[];
  siret?: string;
  website?: string;
  description?: string;
  experience_years?: number;
  panel_brands?: string[];
  inverter_brands?: string[];
  warranty_years?: number;
  certifications: Certifications;
  installation_types: InstallationTypes;
  maintenance_services?: boolean;
  visibility_settings: VisibilitySettings;
}

export interface InstallerData extends InstallerFormData {
  id: string;
  created_at: string;
  credits: number;
  verified: boolean;
  profile_views: number;
  conversion_rate: number;
  satisfied_clients: number;
  subscription_plan: string;
}