export type LeadStatus = "new" | "contacted" | "qualified" | "assigned" | "converted" | "lost";
export type InstallerStatus = "active" | "inactive" | "pending";
export type PaymentType = "prepaid" | "per_lead";

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
  price: number;
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
  prepaidBalance?: number;
  paymentType: PaymentType;
}

// Mock data for testing
export const mockLeads: Lead[] = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "06 12 34 56 78",
    address: "123 rue de Paris",
    postalCode: "75001",
    city: "Paris",
    projectType: "Installation Panneaux Solaires",
    budget: 15000,
    status: "new",
    notes: "Intéressé par une installation complète",
    createdAt: "2024-01-15",
    price: 50
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Martin",
    email: "marie.martin@email.com",
    phone: "06 98 76 54 32",
    address: "456 avenue des Champs",
    postalCode: "69001",
    city: "Lyon",
    projectType: "Pompe à chaleur",
    budget: 12000,
    status: "new",
    notes: "Souhaite un devis rapidement",
    createdAt: "2024-01-16",
    price: 45
  }
];