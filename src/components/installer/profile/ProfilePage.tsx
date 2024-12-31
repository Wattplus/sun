import { Button } from "@/components/ui/button"
import { ProfileHeader } from "./components/ProfileHeader"
import { ProfileStats } from "./components/ProfileStats"
import { BasicInfoSection } from "./sections/BasicInfoSection"
import { SolarSpecificSection } from "./sections/SolarSpecificSection"
import { InterventionZonesSection } from "../account/sections/InterventionZonesSection"
import { motion } from "framer-motion"
import { useInstallerData } from "./hooks/useInstallerData"
import { useInstallerForm } from "./hooks/useInstallerForm"
import { Card } from "@/components/ui/card"
import { Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export const ProfilePage = () => {
  const { formData, setFormData } = useInstallerData()
  const { handleChange, handleCheckboxChange, handleZonesChange, handleSubmit } = useInstallerForm(formData, setFormData)
  const { toast } = useToast()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await handleSubmit(e)
      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        <Card className="p-6">
          <h1 className="text-3xl font-bold text-white mb-2">Mon Profil Professionnel</h1>
          <p className="text-muted-foreground">
            Gérez vos informations professionnelles et vos préférences de visibilité
          </p>
        </Card>

        <ProfileHeader formData={formData} />
        
        <ProfileStats />

        <form onSubmit={onSubmit} className="space-y-6">
          <BasicInfoSection 
            formData={formData} 
            handleChange={handleChange} 
          />
          
          <SolarSpecificSection 
            formData={formData} 
            handleChange={handleChange}
            handleCheckboxChange={handleCheckboxChange}
          />

          <InterventionZonesSection
            selectedZones={formData.service_area}
            onZonesChange={handleZonesChange}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-end"
          >
            <Button 
              type="submit"
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Enregistrer les modifications
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  )
}