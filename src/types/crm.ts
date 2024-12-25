export type LeadStatus = "new" | "contacted" | "qualified" | "assigned" | "converted" | "lost";
export type InstallerStatus = "active" | "inactive" | "pending";

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
  notes: string;
  createdAt: string;
  assignedTo?: string;
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
}