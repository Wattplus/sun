import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

const Admin = () => {
  return (
    <>
      <Helmet>
        <title>Administration - Gestion des Installations Solaires</title>
        <meta name="description" content="Interface d'administration pour la gestion des projets d'installation solaire et le suivi des clients." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Outlet />
    </>
  );
};

export default Admin;