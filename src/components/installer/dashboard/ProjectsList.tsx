import React from "react";

export const mockProjects = [
  {
    id: "1",
    name: "Projet Solaire A",
    status: "En cours",
    assignedTo: "Électricité Plus",
    deadline: "2023-12-01",
  },
  {
    id: "2",
    name: "Projet Solaire B",
    status: "Terminé",
    assignedTo: "Solar Pro",
    deadline: "2023-11-15",
  },
  {
    id: "3",
    name: "Projet Solaire C",
    status: "À venir",
    assignedTo: "Éco-Énergie Solutions",
    deadline: "2024-01-10",
  },
];

const ProjectsList = () => {
  return (
    <div>
      <h2>Liste des Projets</h2>
      <ul>
        {mockProjects.map((project) => (
          <li key={project.id}>
            {project.name} - {project.status} (Assigné à: {project.assignedTo}, Échéance: {project.deadline})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsList;
