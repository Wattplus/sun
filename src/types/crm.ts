export type LeadStatus = "new" | "contacted" | "qualified" | "assigned" | "converted" | "lost";
export type InstallerLeadStatus = "nouveau" | "contacte" | "devis_envoye" | "rdv_planifie" | "negociation" | "signe" | "perdu";
export type InstallerStatus = "active" | "inactive" | "pending";
export type PaymentType = "prepaid" | "per_lead";
export type PurchaseType = "mutualise" | "exclusif";
export type ClientType = "particulier" | "professionnel";

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
}

// Mock data for testing
export const mockLeads: Lead[] = [];
