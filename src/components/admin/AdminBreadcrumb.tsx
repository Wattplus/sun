import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation, Link } from "react-router-dom";

const breadcrumbTitles: Record<string, string> = {
  "admin": "Administration",
  "leads": "Gestion des Leads",
  "installers": "Gestion des Installateurs",
  "marketplace": "Marketplace",
  "dashboard": "Tableau de bord",
  "clients": "Gestion des Clients",
  "settings": "Paramètres",
  "profile": "Profil",
  "documents": "Documents",
  "messages": "Messages",
  "analytics": "Analyses",
  "reports": "Rapports"
};

export const AdminBreadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
            Accueil
          </Link>
        </BreadcrumbItem>
        
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          
          return (
            <React.Fragment key={path}>
              <BreadcrumbSeparator className="text-primary" />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-primary-dark">
                    {breadcrumbTitles[segment] || segment}
                  </BreadcrumbPage>
                ) : (
                  <Link 
                    to={path} 
                    className="text-primary hover:text-primary-dark transition-colors"
                  >
                    {breadcrumbTitles[segment] || segment}
                  </Link>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};