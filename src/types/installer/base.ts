export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface InstallationTypes {
  [key: string]: boolean;
  residential: boolean;
  commercial: boolean;
  industrial: boolean;
}

export interface Certifications {
  [key: string]: boolean;
  qualiPV: boolean;
  rge: boolean;
  qualibat: boolean;
}

export interface VisibilitySettings {
  [key: string]: boolean;
  showPhoneNumber: boolean;
  highlightProfile: boolean;
  showCertifications: boolean;
  acceptDirectMessages: boolean;
}