import { FormField } from "@/components/form/FormField"
import { Card } from "@/components/ui/card"
import { Building } from "lucide-react"
import { motion } from "framer-motion"

interface CompanyInfoProps {
  formData: {
    company: string;
    siret: string;
    address: string;
    postal_code: string;
    city: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CompanyInfoSection = ({ formData, handleChange }: CompanyInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Building className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-white">Informations de l'entreprise</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Nom de l'entreprise"
            id="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Solar Pro SARL"
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
            label="Adresse"
            id="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 rue du Soleil"
            lightMode
          />
          <FormField
            label="Code postal"
            id="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            placeholder="75001"
            lightMode
          />
          <FormField
            label="Ville"
            id="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Paris"
            lightMode
          />
        </div>
      </Card>
    </motion.div>
  )
}