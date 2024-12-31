import { FormField } from "@/components/form/FormField"
import { Card } from "@/components/ui/card"
import { Sun, Save } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

interface PhotovoltaicInfoProps {
  formData: {
    experience: string
    panelBrands: string
    inverterBrands: string
    guaranteeYears: string
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PhotovoltaicInfoSection = ({ formData, handleChange }: PhotovoltaicInfoProps) => {
  const handleSavePhotovoltaicInfo = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("User not found")

      const { error } = await supabase
        .from('installers')
        .update({
          experience_years: parseInt(formData.experience) || null,
          panel_brands: formData.panelBrands.split(',').map(brand => brand.trim()),
          inverter_brands: formData.inverterBrands.split(',').map(brand => brand.trim()),
          warranty_years: parseInt(formData.guaranteeYears) || null,
        })
        .eq('user_id', user.id)

      if (error) throw error

      toast.success("Informations photovoltaïques mises à jour avec succès")
    } catch (error) {
      console.error('Error updating photovoltaic info:', error)
      toast.error("Erreur lors de la mise à jour des informations photovoltaïques")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sun className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-white">Informations photovoltaïques</h3>
          </div>
          <Button 
            onClick={handleSavePhotovoltaicInfo}
            className="bg-primary hover:bg-primary-dark"
          >
            <Save className="w-4 h-4 mr-2" />
            Enregistrer
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Années d'expérience"
            id="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="10"
            lightMode
          />
          <FormField
            label="Marques de panneaux installés"
            id="panelBrands"
            value={formData.panelBrands}
            onChange={handleChange}
            placeholder="SunPower, LG, Panasonic..."
            lightMode
          />
          <FormField
            label="Marques d'onduleurs"
            id="inverterBrands"
            value={formData.inverterBrands}
            onChange={handleChange}
            placeholder="SMA, Fronius, Enphase..."
            lightMode
          />
          <FormField
            label="Garantie (années)"
            id="guaranteeYears"
            value={formData.guaranteeYears}
            onChange={handleChange}
            placeholder="20"
            lightMode
          />
        </div>
      </Card>
    </motion.div>
  )
}