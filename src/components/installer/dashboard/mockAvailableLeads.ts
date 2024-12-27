import { Lead } from "@/types/crm";

export const mockAvailableLeads: Lead[] = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "06 12 34 56 78",
    address: "",
    postalCode: "75001",
    city: "",
    projectType: "residential",
    budget: 15000,
    status: "qualified",
    notes: "",
    createdAt: "2024-03-20",
    price: 35
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Martin",
    email: "marie.martin@email.com",
    phone: "06 23 45 67 89",
    address: "",
    postalCode: "69001",
    city: "",
    projectType: "professional",
    budget: 25000,
    status: "qualified",
    notes: "",
    createdAt: "2024-03-19",
    price: 59
  },
  {
    id: "3",
    firstName: "Pierre",
    lastName: "Bernard",
    email: "pierre.bernard@email.com",
    phone: "06 34 56 78 90",
    address: "",
    postalCode: "33000",
    city: "",
    projectType: "residential",
    budget: 18000,
    status: "qualified",
    notes: "",
    createdAt: "2024-03-18",
    price: 35
  }
];