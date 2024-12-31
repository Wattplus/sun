import { FormField } from "@/components/form/FormField"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { User, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

interface BasicInfoProps {
  formData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    company: string
    siret: string
    website: string
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const BasicInfoSection = ({ formData, handleChange }: BasicInfoProps) => {
  const handleSaveBasicInfo = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("User not found")

      const { error } = await supabase
        .from('installers')
        .update({
          contact_name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          company_name: formData.company,
          siret: formData.siret,
          website: formData.website,
        })
        .eq('user_id', user.id)

      if (error) throw error

      toast.success("Informations de base mises à jour avec succès")
    } catch (error) {
      console.error('Error updating basic info:', error)
      toast.error("Erreur lors de la mise à jour des informations de base")
    }
  }

  return (
    <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-white">Informations de base</h3>
        </div>
        <Button 
          onClick={handleSaveBasicInfo}
          className="bg-primary hover:bg-primary-dark"
        >
          <Save className="w-4 h-4 mr-2" />
          Enregistrer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Prénom"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="John"
          required
          lightMode
        />
        <FormField
          label="Nom"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Doe"
          required
          lightMode
        />
        <FormField
          label="Email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john.doe@example.com"
          disabled
          lightMode
        />
        <FormField
          label="Téléphone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+33 6 12 34 56 78"
          required
          lightMode
        />
        <FormField
          label="Entreprise"
          id="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Nom de votre entreprise"
          required
          lightMode
        />
        <FormField
          label="SIRET"
          id="siret"
          value={formData.siret}
          onChange={handleChange}
          placeholder="123 456 789 00012"
          required
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
  )
}