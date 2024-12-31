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

export interface VisibilityOptions {
  showPhoneNumber: boolean;
  highlightProfile: boolean;
  acceptDirectMessages: boolean;
  showCertifications: boolean;
}

export interface ProfileFormData {
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
  installationTypes: InstallationTypes;
  maintenanceServices: boolean;
}