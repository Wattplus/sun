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
  // Legacy form fields for backward compatibility
  company: string;
  experience: string;
  panelBrands: string;
  inverterBrands: string;
  guaranteeYears: string;
}

export const defaultFormData: InstallerFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company_name: "",
  contact_name: "",
  siret: "",
  website: "",
  description: "",
  experience_years: 0,
  panel_brands: [],
  inverter_brands: [],
  warranty_years: 0,
  service_area: [],
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
  address: "",
  postal_code: "",
  city: "",
  // Legacy form fields
  company: "",
  experience: "",
  panelBrands: "",
  inverterBrands: "",
  guaranteeYears: ""
};