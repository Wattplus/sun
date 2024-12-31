import { Helmet } from "react-helmet"

export const LegalNotice = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Mentions légales - Solar Pro</title>
      </Helmet>
      <h1 className="text-4xl font-bold mb-6">Mentions légales</h1>
      <p className="text-lg text-muted-foreground">Page en construction...</p>
    </div>
  )
}