export * from './base';
export * from './database';
export * from './form';
export * from './transform';

import { InstallerFormData } from './form';
import { VisibilitySettings, InstallationTypes, Certifications } from './base';

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