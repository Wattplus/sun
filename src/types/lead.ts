export type LeadStatus = "new" | "contacted" | "qualified" | "assigned" | "converted" | "lost";
export type VerificationStatus = "pending" | "verified" | "invalid" | "duplicate";

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
  
  // Nouveaux champs
  quality_score?: number;
  roof_surface?: number;
  roof_type?: string;
  electrical_installation?: string;
  property_type?: string;
  annual_consumption?: number;
  verification_status?: VerificationStatus;
  contact_attempts?: number;
  last_contact_date?: string;
  source?: string;
  assigned_installer?: string;
  exclusive_until?: string;
}