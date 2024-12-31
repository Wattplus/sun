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

export type InstallerFormData = Omit<DatabaseInstallerData, 'id' | 'user_id' | 'verified' | 'created_at'>;

export interface InstallerProfile extends DatabaseInstallerData {
  portfolioItems?: PortfolioItem[];
}

export interface PortfolioItem {
  id: string;
  installer_id: string;
  title: string;
  description?: string;
  image_url?: string;
  created_at: string;
}