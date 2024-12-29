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