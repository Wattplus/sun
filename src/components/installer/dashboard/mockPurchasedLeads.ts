import { Lead } from "@/types/crm";

export const mockPurchasedLeads: Lead[] = [
  {
    id: "6",
    firstName: "Emma",
    lastName: "Leroy",
    email: "emma.leroy@email.com",
    phone: "06 67 89 01 23",
    address: "18 rue Victor Hugo",
    postalCode: "44000",
    city: "Nantes",
    projectType: "residential",
    budget: 22000,
    status: "contacted",
    notes: "Maison neuve, installation complète avec batteries",
    createdAt: "2024-03-15",
    price: 35
  },
  {
    id: "7",
    firstName: "Antoine",
    lastName: "Moreau",
    email: "antoine.moreau@email.com",
    phone: "06 78 90 12 34",
    address: "3 place de la République",
    postalCode: "59000",
    city: "Lille",
    projectType: "professional",
    budget: 75000,
    status: "qualified",
    notes: "Usine de production, projet d'autonomie énergétique",
    createdAt: "2024-03-14",
    price: 59
  },
  {
    id: "8",
    firstName: "Julie",
    lastName: "Simon",
    email: "julie.simon@email.com",
    phone: "06 89 01 23 45",
    address: "22 rue des Roses",
    postalCode: "67000",
    city: "Strasbourg",
    projectType: "residential",
    budget: 16000,
    status: "new",
    notes: "Appartement en copropriété, projet collectif",
    createdAt: "2024-03-13",
    price: 35
  }
];