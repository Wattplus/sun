import { Helmet } from "react-helmet"
import { FAQ as FAQComponent } from "@/components/FAQ"

export const FAQ = () => {
  return (
    <>
      <Helmet>
        <title>FAQ - Questions fréquentes sur les panneaux solaires</title>
        <meta 
          name="description" 
          content="Trouvez les réponses à vos questions sur l'installation de panneaux solaires, les aides financières, la rentabilité et la maintenance." 
        />
      </Helmet>

      <main className="min-h-screen bg-background">
        <FAQComponent />
      </main>
    </>
  )
}