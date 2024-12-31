import { BrowserRouter as Router } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { InstallerLayout } from "@/components/installer/navigation/InstallerLayout";
import { Helmet } from "react-helmet";

export const InstallerProfile = () => {
  return (
    <Router>
      <Helmet>
        <title>Espace Installateur - Gestion des Projets Solaires</title>
        <meta 
          name="description" 
          content="Gérez vos projets d'installation solaire, suivez vos leads et communiquez avec vos clients depuis votre espace installateur dédié." 
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta 
          property="og:title" 
          content="Espace Installateur - Gestion des Projets Solaires" 
        />
        <meta 
          property="og:description" 
          content="Plateforme de gestion pour les installateurs de panneaux solaires : leads, projets et communication client." 
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <InstallerLayout />
    </Router>
  );
};