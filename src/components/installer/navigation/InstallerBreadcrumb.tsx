import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function InstallerBreadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbMap: { [key: string]: string } = {
    'espace-installateur': 'Accueil',
    'leads': 'Leads',
    'marketplace': 'Marketplace',
    'new': 'Nouveaux leads',
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      <Link 
        to="/espace-installateur"
        className="flex items-center hover:text-primary transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      {pathSegments.map((segment, index) => (
        <div key={segment} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-1" />
          <Link
            to={`/${pathSegments.slice(0, index + 1).join('/')}`}
            className="hover:text-primary transition-colors"
          >
            {breadcrumbMap[segment] || segment}
          </Link>
        </div>
      ))}
    </nav>
  );
}