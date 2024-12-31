import { InstallationTypes, Certifications, VisibilitySettings } from './base';

export interface InstallerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  siret: string;
  website: string;
  description: string;
  experience: string;
  panelBrands: string;
  inverterBrands: string;
  guaranteeYears: string;
  service_area: string[];
  certifications: Certifications;
  installation_types: InstallationTypes;
  maintenance_services: boolean;
  visibility_settings: VisibilitySettings;
  address: string;
  postal_code: string;
  city: string;
}