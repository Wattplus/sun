import { Outlet } from "react-router-dom"
import { Helmet } from "react-helmet"

export const InstallerSpace = () => {
  return (
    <>
      <Helmet>
        <title>Espace Installateur - Gestion des Projets Solaires</title>
        <meta 
          name="description" 
          content="Gérez vos projets d'installation solaire, suivez vos leads et communiquez avec vos clients depuis votre espace installateur dédié." 
        />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-background/80 to-background">
        <Outlet />
      </div>
    </>
  )
}