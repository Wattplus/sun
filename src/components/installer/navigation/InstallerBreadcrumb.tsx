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
import { ChevronRight, Home, Building2, UserPlus, ShoppingCart } from "lucide-react";

const breadcrumbTitles: Record<string, string> = {
  "espace-installateur": "Espace Installateur",
  "leads": "Leads",
  "nouveaux": "Nouveaux leads",
  "achetes": "Leads achetés",
  "messages": "Messages",
  "profil": "Profil",
  "abonnement": "Abonnement",
  "documents": "Documents",
  "parametres": "Paramètres",
  "notifications": "Notifications",
  "compte": "Mon compte",
  "paiement": "Paiement",
  "recharge": "Recharge",
  "nouvelle-carte": "Nouvelle carte"
};

const breadcrumbIcons: Record<string, React.ComponentType> = {
  "espace-installateur": Building2,
  "leads": UserPlus,
  "achetes": ShoppingCart,
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
            <span className="flex items-center">
              <Home className="h-4 w-4" />
            </span>
            <span className="hidden sm:inline">Accueil</span>
          </Link>
        </BreadcrumbItem>
        
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const Icon = breadcrumbIcons[segment];
          
          return (
            <React.Fragment key={path}>
              <BreadcrumbSeparator>
                <span className="flex items-center">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="font-medium flex items-center gap-2">
                    {Icon && (
                      <span className="flex items-center">
                        <Icon className="h-4 w-4" />
                      </span>
                    )}
                    {breadcrumbTitles[segment] || segment}
                  </BreadcrumbPage>
                ) : (
                  <Link 
                    to={path} 
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {Icon && (
                      <span className="flex items-center">
                        <Icon className="h-4 w-4" />
                      </span>
                    )}
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