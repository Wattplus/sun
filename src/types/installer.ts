export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface VisibilitySettings {
  showPhoneNumber: boolean;
  highlightProfile: boolean;
  showCertifications: boolean;
  acceptDirectMessages: boolean;
}

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
}

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
  city: string | null;
  website: string | null;
  description: string | null;
  experience_years: number | null;
  panel_brands: string[] | null;
  inverter_brands: string[] | null;
  warranty_years: number | null;
  certifications: Certifications;
  installation_types: InstallationTypes;
  maintenance_services: boolean;
  visibility_settings: VisibilitySettings;
  service_area: string[];
  created_at?: string;
  credits?: number;
  verified?: boolean;
  conversion_rate?: number;
  profile_views?: number;
  satisfied_clients?: number;
  subscription_plan?: string;
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
  experience_years: number;
  panel_brands: string[];
  inverter_brands: string[];
  warranty_years: number;
  certifications: Certifications;
  installation_types: InstallationTypes;
  maintenance_services: boolean;
  visibility_settings: VisibilitySettings;
  service_area: string[];
}

export const defaultFormData: InstallerFormData = {
  company_name: "",
  contact_name: "",
  email: "",
  phone: "",
  siret: "",
  address: "",
  postal_code: "",
  city: "",
  website: "",
  description: "",
  experience_years: 0,
  panel_brands: [],
  inverter_brands: [],
  warranty_years: 0,
  certifications: {
    qualiPV: false,
    rge: false,
    qualibat: false
  },
  installation_types: {
    residential: false,
    commercial: false,
    industrial: false
  },
  maintenance_services: false,
  visibility_settings: {
    showPhoneNumber: true,
    highlightProfile: false,
    showCertifications: true,
    acceptDirectMessages: true
  },
  service_area: []
};