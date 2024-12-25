import { Lead } from "@/types/crm";

export const mockPurchasedLeads: Lead[] = [
  {
    id: "1",
    firstName: "Thomas",
    lastName: "D.",
    email: "t****@email.com",
    phone: "06 ** ** ** 78",
    address: "Rue des Lilas",
    postalCode: "75001",
    city: "Paris",
    projectType: "residential",
    budget: 15000,
    status: "new",
    notes: "Installation de panneaux solaires sur toiture inclinée",
    createdAt: "2024-03-15",
    price: 50
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "L.",
    email: "m****@email.com",
    phone: "06 ** ** ** 89",
    address: "Avenue du Soleil",
    postalCode: "69001",
    city: "Lyon",
    projectType: "residential",
    budget: 12000,
    status: "contacted",
    notes: "Projet photovoltaïque avec batterie de stockage",
    createdAt: "2024-03-10",
    price: 45
  },
  {
    id: "3",
    firstName: "Pierre",
    lastName: "B.",
    email: "p****@email.com",
    phone: "06 ** ** ** 90",
    address: "Boulevard de la Mer",
    postalCode: "13001",
    city: "Marseille",
    projectType: "professional",
    budget: 25000,
    status: "qualified",
    notes: "Installation solaire pour commerce avec forte consommation",
    createdAt: "2024-03-05",
    price: 65
  }
];