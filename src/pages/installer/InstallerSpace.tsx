import { Outlet } from "react-router-dom"
import { Helmet } from "react-helmet"
import { InstallerLayout } from "@/components/installer/navigation/InstallerLayout"

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
      <InstallerLayout />
    </>
  )
}