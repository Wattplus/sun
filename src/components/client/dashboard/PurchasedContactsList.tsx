import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, Building } from "lucide-react"
import { Button } from "@/components/ui/button"

export const PurchasedContactsList = () => {
  // Exemple de données (à remplacer par les vraies données)
  const purchasedContacts = [
    {
      id: 1,
      companyName: "Solar Expert",
      contactName: "Marie Martin",
      email: "contact@solarexpert.fr",
      phone: "01 23 45 67 89",
      purchaseDate: "2024-03-25",
      type: "exclusif"
    },
    {
      id: 2,
      companyName: "Éco Énergie",
      contactName: "Pierre Dubois",
      email: "info@ecoenergie.fr",
      phone: "01 98 76 54 32",
      purchaseDate: "2024-03-24",
      type: "mutualisé"
    }
  ]

  return (
    <Card className="p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Entreprises intéressées par votre projet</h2>
      <div className="space-y-4">
        {purchasedContacts.map((contact) => (
          <Card key={contact.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                <h3 className="font-medium">{contact.companyName}</h3>
              </div>
              <Badge variant={contact.type === "exclusif" ? "default" : "secondary"}>
                {contact.type === "exclusif" ? "Contact exclusif" : "Contact mutualisé"}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              Contact : {contact.contactName}
            </p>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => window.location.href = `tel:${contact.phone}`}
              >
                <Phone className="w-4 h-4 mr-2" />
                Appeler
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => window.location.href = `mailto:${contact.email}`}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
          </Card>
        ))}
        
        {purchasedContacts.length === 0 && (
          <p className="text-center text-muted-foreground py-4">
            Aucune entreprise n'a encore acheté vos coordonnées.
          </p>
        )}
      </div>
    </Card>
  )
}