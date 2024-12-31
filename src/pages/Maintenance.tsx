import { Helmet } from "react-helmet"

export const Maintenance = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Maintenance - Solar Pro</title>
      </Helmet>
      <h1 className="text-4xl font-bold mb-6">Maintenance</h1>
      <p className="text-lg text-muted-foreground">Page en construction...</p>
    </div>
  )
}