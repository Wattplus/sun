export type LeadStatus = "new" | "contacted" | "qualified" | "assigned" | "converted" | "lost";
export type InstallerStatus = "active" | "inactive" | "pending";
export type PaymentType = "prepaid" | "per_lead";
export type PurchaseType = "mutualise" | "exclusif";
export type ClientType = "particulier" | "professionnel";
export type InstallerLeadStatus = "nouveau" | "contacte" | "devis_envoye" | "rdv_planifie" | "negociation" | "signe" | "perdu";

export interface Lead {
  id: string;
  created_at: string;
  clienttype: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  monthlybill: string;
  postalcode: string;
  status: LeadStatus;
  notes?: string;
  address?: string;
  city?: string;
  assignedto?: string;
  purchasedby?: string[];
  projectType?: string;
  price?: number;
  installerStatus?: InstallerLeadStatus;
  roofType?: string;
  electricalType?: string;
  budget?: number;
}

export interface Installer {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  zones: string[];
  status: InstallerStatus;
  commission: number;
  leadsAssigned: number;
  conversionRate: number;
  paymentType: PaymentType;
  certifications: {
    qualiPV: boolean;
    rge: boolean;
    qualibat: boolean;
  };
  yearFounded: string;
  siret?: string;
  siren?: string;
}

// Mock data for testing
export const mockLeads: Lead[] = [];