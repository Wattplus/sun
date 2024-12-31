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
import { ChevronRight, Home } from "lucide-react";

const breadcrumbTitles: Record<string, string> = {
  "espace-installateur": "Tableau de bord",
  "projets": "Projets",
  "messages": "Messages",
  "profil": "Profil",
  "abonnement": "Abonnement",
  "leads": "Leads",
  "documents": "Documents",
  "parametres": "Paramètres",
  "notifications": "Notifications"
};

export const InstallerBreadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList className="bg-background/50 backdrop-blur-md px-3 sm:px-4 py-2 rounded-lg border border-primary/20 overflow-x-auto whitespace-nowrap">
        <BreadcrumbItem>
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Accueil</span>
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
                    className="text-muted-foreground hover:text-primary transition-colors"
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