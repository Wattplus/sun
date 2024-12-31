import { FormField } from "@/components/form/FormField"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Save } from "lucide-react"
import { InterventionZonesSection } from "./InterventionZonesSection"
import { motion } from "framer-motion"

interface ProfileFormProps {
  formData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    company: string
    siret: string
    website: string
    description: string
    service_area?: string[]
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  isLoading: boolean
}

export const ProfileForm = ({ formData, handleChange, handleSubmit, isLoading }: ProfileFormProps) => {
  const handleZonesChange = (zones: string[]) => {
    // Update the service_area in formData
    formData.service_area = zones;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Prénom"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
            />

            <FormField
              label="Nom"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
            />

            <FormField
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              disabled
            />

            <FormField
              label="Téléphone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+33 6 12 34 56 78"
              required
            />

            <FormField
              label="Entreprise"
              id="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Nom de votre entreprise"
              required
            />

            <FormField
              label="SIRET"
              id="siret"
              value={formData.siret}
              onChange={handleChange}
              placeholder="123 456 789 00012"
              required
            />

            <FormField
              label="Site web"
              id="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="www.monentreprise.fr"
            />

            <FormField
              label="Description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez votre entreprise en quelques mots"
            />
          </div>
        </Card>

        <InterventionZonesSection
          selectedZones={formData.service_area || []}
          onZonesChange={handleZonesChange}
        />

        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="w-full md:w-auto flex items-center gap-2"
            disabled={isLoading}
            size="lg"
          >
            <Save className="w-4 h-4" />
            {isLoading ? "Enregistrement en cours..." : "Enregistrer les modifications"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};