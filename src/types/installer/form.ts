import { InstallationTypes, Certifications, VisibilitySettings } from './base';

export interface InstallerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company_name: string;
  contact_name: string;
  siret: string;
  website: string;
  description: string;
  experience_years: number;
  panel_brands: string[];
  inverter_brands: string[];
  warranty_years: number;
  service_area: string[];
  certifications: Certifications;
  installation_types: InstallationTypes;
  maintenance_services: boolean;
  visibility_settings: VisibilitySettings;
  address: string;
  postal_code: string;
  city: string;
}