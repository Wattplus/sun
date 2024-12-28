export interface Project {
  id: string;
  clientName: string;
  location: string;
  projectType: string;
  budget: number;
  documents: number;
  lastUpdate: string;
  status: string;
}

export const mockProjects: Project[] = [
  {
    id: "1",
    clientName: "Jean Dupont",
    location: "Paris",
    projectType: "Installation résidentielle",
    budget: 15000,
    documents: 3,
    lastUpdate: "2024-03-15",
    status: "En cours"
  },
  {
    id: "2",
    clientName: "Marie Martin",
    location: "Lyon",
    projectType: "Installation commerciale",
    budget: 25000,
    documents: 5,
    lastUpdate: "2024-03-14",
    status: "À venir"
  }
];