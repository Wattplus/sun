import { Lead } from "@/types/crm";

export const mockAvailableLeads: Lead[] = [
  {
    id: "4",
    firstName: "Sophie",
    lastName: "Dubois",
    email: "sophie.dubois@email.com",
    phone: "06 45 67 89 01",
    address: "123 rue des Fleurs",
    postalCode: "33000",
    city: "Bordeaux",
    projectType: "residential",
    budget: 18000,
    status: "qualified",
    notes: "Intéressée par des panneaux solaires pour sa maison",
    createdAt: "2024-03-18",
    price: 55
  },
  {
    id: "5",
    firstName: "Lucas",
    lastName: "Martin",
    email: "lucas.martin@email.com",
    phone: "06 56 78 90 12",
    address: "456 avenue du Soleil",
    postalCode: "69002",
    city: "Lyon",
    projectType: "residential",
    budget: 22000,
    status: "qualified",
    notes: "Souhaite une installation complète avec batteries",
    createdAt: "2024-03-17",
    price: 65
  },
  {
    id: "6",
    firstName: "Emma",
    lastName: "Petit",
    email: "emma.petit@email.com",
    phone: "06 67 89 01 23",
    address: "789 boulevard des Pins",
    postalCode: "31000",
    city: "Toulouse",
    projectType: "professional",
    budget: 35000,
    status: "qualified",
    notes: "Restaurant cherchant à réduire sa facture énergétique",
    createdAt: "2024-03-16",
    price: 85
  }
];