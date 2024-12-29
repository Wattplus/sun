export type LeadStatus = "new" | "contacted" | "qualified" | "assigned" | "converted" | "lost";
export type InstallerLeadStatus = "nouveau" | "contacte" | "devis_envoye" | "rdv_planifie" | "negociation" | "signe" | "perdu";
export type InstallerStatus = "active" | "inactive" | "pending";
export type PaymentType = "prepaid" | "per_lead";
export type PurchaseType = "mutualise" | "exclusif";

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

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  projectType: string;
  budget: number;
  status: LeadStatus;
  installerStatus?: InstallerLeadStatus;
  notes: string;
  createdAt: string;
  assignedTo?: string;
  price: number;
  exclusivityPrice?: number;
  purchasedBy?: Array<{
    installerId: string;
    purchaseType: PurchaseType;
    purchaseDate: string;
  }>;
  roofType?: string;
  monthlyBill?: string;
  electricalType?: string;
  lastUpdated?: string;
}

// Mock data for testing
export const mockLeads: Lead[] = [];
