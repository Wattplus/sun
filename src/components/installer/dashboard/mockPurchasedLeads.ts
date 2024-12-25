import { Lead } from "@/types/crm";

export const mockPurchasedLeads: Lead[] = [
  {
    id: "1",
    firstName: "Thomas",
    lastName: "Martin",
    email: "thomas.martin@email.com",
    phone: "06 12 34 56 78",
    address: "123 rue de Paris",
    postalCode: "75001",
    city: "Paris",
    projectType: "residential",
    budget: 15000,
    status: "new",
    notes: "Intéressé par une installation complète",
    createdAt: "2024-03-15",
    price: 50
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Dubois",
    email: "marie.dubois@email.com",
    phone: "06 23 45 67 89",
    address: "456 avenue des Champs",
    postalCode: "69001",
    city: "Lyon",
    projectType: "residential",
    budget: 12000,
    status: "contacted",
    notes: "Rendez-vous prévu la semaine prochaine",
    createdAt: "2024-03-10",
    price: 45
  },
  {
    id: "3",
    firstName: "Pierre",
    lastName: "Bernard",
    email: "pierre.bernard@email.com",
    phone: "06 34 56 78 90",
    address: "789 boulevard de la Mer",
    postalCode: "13001",
    city: "Marseille",
    projectType: "professional",
    budget: 25000,
    status: "qualified",
    notes: "Devis en cours de préparation",
    createdAt: "2024-03-05",
    price: 65
  }
];