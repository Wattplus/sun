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
import { ChevronRight } from "lucide-react";

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
  "reports": "Rapports",
  "finance": "Finance",
  "support": "Support",
  "notifications": "Notifications",
  "users": "Gestion des Utilisateurs",
  "pricing": "Paramétrage des Prix",
  "transactions": "Suivi des Transactions",
  "complaints": "Gestion des Réclamations",
  "export": "Export de Données"
};

export const AdminBreadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList className="bg-background/50 backdrop-blur-md px-4 py-2 rounded-lg border border-border">
        <BreadcrumbItem>
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Accueil
          </Link>
        </BreadcrumbItem>
        
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          
          return (
            <React.Fragment key={path}>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="font-medium">
                    {breadcrumbTitles[segment] || segment}
                  </BreadcrumbPage>
                ) : (
                  <Link 
                    to={path} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
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