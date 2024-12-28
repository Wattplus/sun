import { FormField } from "@/components/form/FormField"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { User } from "lucide-react"

interface BasicInfoProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    siret: string;
    website: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BasicInfoSection = ({ formData, handleChange }: BasicInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-white">Informations de base</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Prénom"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            lightMode
          />
          <FormField
            label="Nom"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            lightMode
          />
          <FormField
            label="Email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            lightMode
          />
          <FormField
            label="Téléphone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+33 6 12 34 56 78"
            lightMode
          />
          <FormField
            label="Entreprise"
            id="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nom de votre entreprise"
            lightMode
          />
          <FormField
            label="SIRET"
            id="siret"
            value={formData.siret}
            onChange={handleChange}
            placeholder="123 456 789 00012"
            lightMode
          />
          <FormField
            label="Site web"
            id="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="www.monentreprise.fr"
            lightMode
          />
        </div>
      </Card>
    </motion.div>
  )
}